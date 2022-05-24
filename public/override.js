const pageForPath = {
  "/": "home",
  "/login/index.php": "login",
};

/**
 * @param {string} filePath
 * @return {url}
 */
const getExtensionUrl = (filePath) => chrome.runtime.getURL(filePath);

/**
 * @return {string|null}
 */
const tryGetPageName = () => pageForPath[location.pathname] ?? null;

/**
 * @param {string} pageName
 * @return {Promise<html>}
 */
const getOverrideHtmlAsync = async (pageName) => {
  return fetch(getExtensionUrl(`${pageName}.html`)).then((res) => res.text());
};

/**
 * @param {string} pageName
 * @return {Promise<Document>}
 */
const getOverrideDocAsync = async (pageName) => {
  const rawHtml = await getOverrideHtmlAsync(pageName);
  const html = rawHtml.replaceAll(/better\//g, getExtensionUrl("/"));
  return new DOMParser().parseFromString(html, "text/html");
};

/**
 * @param {string} pageName
 * @return {Promise<Scanner>}
 */
const getScannerAsync = (pageName) => {
  return import(getExtensionUrl(`scanners/${pageName}.js`))
    .then((m) => m.default)
    .catch(() => console.log(`No scanner for ${pageName}`));
};

const runScripts = () => {
  const run = (script) => {
    const newScript = document.createElement("script");
    newScript.src = script.src;
    script.replaceWith(newScript);
  };

  Array.from(document.scripts).forEach(run);
};

(async function tryOverridePage() {
  document.documentElement.style.display = "none";

  const pageName = tryGetPageName();
  if (!pageName) document.documentElement.style.display = "initial";

  const overrideDoc = await getOverrideDocAsync(pageName);
  const scanner = await getScannerAsync(pageName);

  const data = scanner(document);
  document.replaceChild(overrideDoc.documentElement, document.documentElement);
  document
    .querySelector("#app")
    .setAttribute("scan-data", JSON.stringify(data));

  runScripts();
})();

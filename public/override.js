const pageForPath = {
  "/": "home",
  "/login/index.php": "login",
  "/course/view.php": "course",
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
 * @return {Promise<DocScanner<any>>}
 */
const getScannerAsync = async (pageName) => {
  const filePath = `scanners/${pageName}ScanData.js`;
  const url = getExtensionUrl(filePath);
  const { default: scanner } = await import(url);
  return scanner ?? (() => ({}));
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
  if (data) {
    document.replaceChild(
      overrideDoc.documentElement,
      document.documentElement
    );
    document
      .querySelector("#app")
      .setAttribute("scan-data", JSON.stringify(data));
  } else console.error("Could not scan data!");

  runScripts();
})();

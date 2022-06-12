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
 * @return {Promise<ScrapePage<any>>}
 */
const getScraperAsync = async (pageName) => {
  const filePath = `scrapers/page/${pageName}.js`;
  const url = getExtensionUrl(filePath);
  const { tryScrapePage: scraper } = await import(url);
  return scraper ?? (() => ({}));
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
  if (pageName) {
  } else {
    document.documentElement.style.display = "initial";
    return;
  }

  const overrideDoc = await getOverrideDocAsync(pageName);
  const scraper = await getScraperAsync(pageName);

  const data = scraper(document.documentElement);
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

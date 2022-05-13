const noMoving = {
    extract: () => ({}),
    inject: () => {
    }
}

/**
 * @param {string} html
 * @return {Document}
 */
const makeDoc = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

/**
 * @param {string} filePath
 * @return {string}
 */
const getUrl = filePath =>
    chrome.runtime.getURL(`${filePath}`);

/**
 * @return {string}
 */
const tryGetDirectoryPath = () => {
    const urlPath = window.location.pathname
    const directoryPath = urlPath.substring(0, urlPath.lastIndexOf("/") + 1)
    return `/files/pages${directoryPath}`
}

/**
 * @return {string}
 */
const tryGetPagePath = () =>
    `${tryGetDirectoryPath()}page.html`;

/**
 * @return {string}
 */
const getMoveScriptPath = () =>
    `${tryGetDirectoryPath()}move.js`;

/**
 * @return {Promise<html>}
 */
const tryGetPageHtml = () => {
    const path = tryGetPagePath()
    const url = getUrl(path)
    return fetch(url)
        .then(r => r.text())
        .catch(_ => null);
};

/**
 * @param {string} placeholder
 * @return {string}
 */
const replacePlaceholder = placeholder =>
    getUrl(`files${placeholder.substring(5)}`)

/**
 * @param {html} rawHtml
 * @return {html}
 */
const processHtml = rawHtml =>
    rawHtml.replaceAll(/\[ext\][^\"]*/gm, replacePlaceholder);

/**
 * @return {Promise<MoveFunctions>}
 */
const tryGetMoveFunctions = () => {
    const path = getMoveScriptPath()
    const url = getUrl(path)
    return import(url)
        .then(m => ({extract: m.extract, inject: m.inject}))
        .catch(_ => noMoving)
}

function runScripts() {

    const run = (script) => {
        const newScript = document.createElement("script")
        newScript.src = script.src;
        script.replaceWith(newScript)
    }

    Array.from(document.scripts).forEach(run)
}

async function tryReplaceHtml() {
    const rawHtml = await tryGetPageHtml()
    if (rawHtml != null) {
        const {extract, inject} = await tryGetMoveFunctions()
        const data = extract(document)

        const html = processHtml(rawHtml)
        const newDoc = makeDoc(html)
        inject(newDoc, data)

        document.replaceChild(newDoc.documentElement, document.documentElement)

        runScripts()
    }
}

document.documentElement.style.display = "none"

window.addEventListener("load", async function (event) {
    event.stopImmediatePropagation();
    await tryReplaceHtml()
}, true);


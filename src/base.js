const getUrl = filePath => chrome.runtime.getURL(`${filePath}`);

const tryGetPagePath = () => {
    const urlPath = window.location.pathname
    const directoryPath = urlPath.substring(0, urlPath.lastIndexOf("/") + 1)
    return `/files/pages${directoryPath}page.html`
};

const tryGetPageHtml = () => {
    const path = tryGetPagePath()
    const url = getUrl(path)
    return fetch(url)
        .then(r => r.text())
        .catch(_ => null);
};

const processHtml = rawHtml =>
    rawHtml.replaceAll(/\[ext\][^\"]*/gm,
                       match => getUrl(`files${match.substring(5)}`));

async function tryReplaceHtml() {
    const rawHtml = await tryGetPageHtml()
    if (rawHtml != null) {
        document.documentElement.innerHTML = processHtml(rawHtml)
    }
}

(async function init() {
    await tryReplaceHtml()
}())



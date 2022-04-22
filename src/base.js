const getUrl = filePath =>
    chrome.runtime.getURL(`${filePath}`);

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

const replacePlaceholder = placeholder =>
    getUrl(`files${placeholder.substring(5)}`)

const processHtml = rawHtml =>
    rawHtml.replaceAll(/\[ext\][^\"]*/gm, replacePlaceholder);

const tryReplaceHtml = async () => {
    const rawHtml = await tryGetPageHtml()
    if (rawHtml != null) {
        document.write(processHtml(rawHtml))
        document.close()
    }
};

(async function init() {
    await tryReplaceHtml()
}())



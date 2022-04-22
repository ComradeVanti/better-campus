function injectCSS(url) {
    const link = document.createElement("link");
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function getUrl(filePath) {
    return chrome.runtime.getURL(`${filePath}`)
}

function injectCSSFile(filePath) {
    const url = getUrl(filePath)
    injectCSS(url)
}

function getPageDirectoryPath() {
    const path = window.location.pathname;
    return path.substring(0, path.lastIndexOf("/") + 1)
}

async function simplifyHtml() {
    const url = getUrl(`src/${getPageDirectoryPath()}simplify.js`)
    const {default: config} = await import(url)

    // Merge elements

    config.mergeElement.forEach(selector => {
        Array.from(document.querySelectorAll(selector))
            .forEach(element => {
                const parent = element.parentNode
                Array.from(element.children)
                    .forEach(child => parent.appendChild(child))
                parent.removeChild(element)
            })
    })

    // Remove classes

    Object.entries(config.removeClass).forEach(([selector, clasNames]) => {
        Array.from(document.querySelectorAll(selector))
            .forEach(element => clasNames.forEach(className => element.classList.remove(className)))
    })

    // Add classes

    Object.entries(config.addClass).forEach(([selector, clasNames]) => {
        Array.from(document.querySelectorAll(selector))
            .forEach(element => clasNames.forEach(className => element.classList.add(className)))
    })

}

async function replaceCSS() {

    // Remove old CSS

    Array.from(document.styleSheets)
        .forEach(it => it.disabled = true)

    // Add base style-sheet

    injectCSSFile("src/style.css")

    // Manage theme

    const darkModeEnabled = (await chrome.storage.sync.get("darkMode")).darkMode

    injectCSSFile(darkModeEnabled ? "src/dark.css" : "src/light.css")
}

function replaceTitle() {
    const emojis = [
        ":)", "UwU", "OwO", "<3", ":P", ":3", ":*"
    ]

    const chosen = emojis[Math.floor(Math.random() * emojis.length)]

    document.title = `eCampus ${chosen}`
}

function replaceLogo() {
    const logoUrl = getUrl("logo.png");

    Array.from(document.querySelectorAll("img"))
        .filter(it => it.src.includes("ecampus_Header"))
        .forEach(it => it.src = logoUrl)
}

function replaceIcons() {
    injectCSS("https://fonts.googleapis.com/icon?family=Material+Icons")

    const replacements = [
        ["forum", "forum"],
        ["url", "link"],
        ["pdf", "picture_as_pdf"],
        ["document", "article"],
        ["assign", "assignment"],
        ["attendance", "people"],
        ["powerpoint", "slideshow"],
        ["html", "html"],
        ["spreadsheet", "border_all"],
        ["folder", "folder"],
        ["questionnaire", "quiz"],
        ["glossary", "info"],
        ["archive", "archive"],
        ["text", "article"],
        ["page", "description"],
        ["jpeg", "image"],
        ["choice", "quiz"],
        ["quiz", "quiz"],
        ["journal", "edit_note"],
        ["wiki", "info"],
        ["hvp", "extension"],
        ["mpeg", "play_circle_filled"],
        ["publication", "folder"]
    ]

    function replaceWithIcon(element, iconName) {
        const icon = document.createElement("span")
        icon.className = "material-icons"
        icon.innerText = iconName

        element.parentElement.prepend(icon)
        element.parentElement.removeChild(element)
    }

    Array.from(document.querySelectorAll("img.activityicon, img.icon"))
        .forEach(it => {
            const replacement =
                replacements.find(([search, _]) => it.src.includes(search))

            if (replacement)
                replaceWithIcon(it, replacement[1])
            else
                console.log(`unknown icon: ${it.src}`)
        })
}

(async function init() {
    await simplifyHtml()
    await replaceCSS()
    replaceTitle()
    replaceLogo()
    replaceIcons()
}())



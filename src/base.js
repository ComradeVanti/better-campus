function injectCSS(url) {
    const link = document.createElement("link");
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function replaceTitle() {
    const emojis = [
        ":)", "UwU", "OwO", "<3", ":P", ":3", ":*"
    ]

    const chosen = emojis[Math.floor(Math.random() * emojis.length)]

    document.title = `eCampus ${chosen}`
}

function replaceLogo() {
    const logoUrl = chrome.runtime.getURL("logo.png");

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

    Array.from(document.querySelectorAll("img.activityicon"))
        .forEach(it => {
            const replacement =
                replacements.find(([search, _]) => it.src.includes(search))

            if (replacement)
                replaceWithIcon(it, replacement[1])
            else
                console.log(`unknown icon: ${it.src}`)
        })
}

replaceTitle()
replaceLogo()
replaceIcons()

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
        .filter(it => it.src.includes("core_admin/logo"))
        .forEach(it => it.src = logoUrl)
}

replaceTitle()
replaceLogo()

function updateDarkMode() {
    const enabled = this.checked
    chrome.storage.sync.set({darkMode: enabled})
}

(async function init() {
    const darkModeInput = document.querySelector("#input-dark-mode")
    darkModeInput.addEventListener("change", updateDarkMode)
    darkModeInput.checked = (await chrome.storage.sync.get("darkMode")).darkMode
}())

function updateDarkMode() {
    const enabled = this.checked
    chrome.storage.sync.set({darkMode: enabled})
}

document.querySelector("#input-dark-mode")
    .addEventListener("change", updateDarkMode)

function replaceLogo(){
    const logoUrl =  chrome.runtime.getURL("logo.png");

    Array.from(document.querySelectorAll("img"))
        .filter(it => it.src.includes("core_admin/logo"))
        .forEach(it => it.src = logoUrl)
}

replaceLogo()

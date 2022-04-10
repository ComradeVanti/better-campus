function fileUrl(path) {
    return chrome.runtime.getURL(path);
}

const logoUrl = fileUrl("logo.png");
const hideUrl = fileUrl("hideConfig.json")
const quickLinksUrl = fileUrl("src/quickLinks.html")

// Reword title

document.title = "eCampus <3"

// Override logo

document.getElementsByClassName("img-fluid")[0].src = logoUrl;

// Hide elements

fetch(hideUrl)
    .then(it => it.json())
    .then(hideSelectors =>
              hideSelectors
                  .flatMap(it => Array.from(document.querySelectorAll(it)))
                  .forEach(it => it.style.display = "none"))

// Replace content

document.querySelector(".site-name")
    .innerHTML = `<img src=${logoUrl} class="logo">`

fetch(quickLinksUrl)
    .then(it => it.text())
    .then(it => document.querySelector("nav>a+ul").innerHTML = it)

// Change classes

document.querySelector("nav>a+ul").className = "quick-links"

function fileUrl(path) {
    return chrome.runtime.getURL(path);
}

const cssUrl = fileUrl("src/override.css");
const logoUrl = fileUrl("logo.png");
const hideUrl = fileUrl("hideConfig.json")

// Override css

const link = document.createElement("link");
link.href = cssUrl
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

// Override logo

document.getElementsByClassName("img-fluid")[0].src = logoUrl;

// Hide elements

fetch(hideUrl)
    .then(it => it.json())
    .then(hideSelectors =>
              hideSelectors
                  .flatMap(it => Array.from(document.querySelectorAll(it)))
                  .forEach(it => it.style.display = "none"))

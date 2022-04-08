const cssUrl = chrome.runtime.getURL("src/override.css");
const logoUrl = chrome.runtime.getURL("logo.png");

// Override css

const link = document.createElement("link");
link.href = cssUrl
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

// Override logo

document.getElementsByClassName("img-fluid")[0].src = logoUrl

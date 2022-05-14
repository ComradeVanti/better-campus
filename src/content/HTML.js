/**
 * @param {string} html
 * @return {Document}
 */
export function makeDocFrom(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

/**
 * @param {Document} doc
 * @param {string} html
 * @return {HTMLElement}
 */
export function makeElementFrom(doc, html) {
    const wrapper = doc.createElement("div")
    wrapper.innerHTML = html
    return wrapper.firstElementChild
}

/**
 * @param {string} html
 * @param {[string, string][]} placeholdersWithReplacement
 * @return {string}
 */
export function replacePlaceholders(html, placeholdersWithReplacement) {

    function apply([placeholder, replacement]) {
        html = html.replace(`[${placeholder}]`, replacement)
    }

    placeholdersWithReplacement.forEach(apply)

    return html
}

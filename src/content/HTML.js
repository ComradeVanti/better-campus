/**
 * @param {string} html
 * @return {Document}
 */
export function makeDocFrom(html){
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

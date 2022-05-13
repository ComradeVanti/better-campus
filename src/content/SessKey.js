/**
 * @typedef {string} SessKey
 */

const sessKeyRegex = /"sesskey":"(?<sessKey>[^"]*)"/

/**
 * @param {Document} document
 * @return {?SessKey}
 */
export function tryFindIn(document) {
    const match = sessKeyRegex.exec(document.documentElement.innerText)
    return match ? match.groups.sessKey : null
}

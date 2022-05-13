const semesterLabelRegex = /(?<season>WS|SS)(?<year>\d{4})/

/**
 * @enum {string}
 * @readonly
 */
export const Season = {
    Winter: "WS",
    Summer: "SS"
}

/**
 * @typedef {Object} SemesterId
 * @property {number} year
 * @property {Season} season
 */

/**
 * @typedef {Object} Semester
 * @property {SemesterId} id
 * @property {Course[]} courses
 */

/**
 * @param {Semester} semester
 * @return {string}
 */
export function nameOf(semester) {
    return `${semester.id.season}${semester.id.year}`
}

/**
 * @param {string} s
 * @return {?SemesterId}
 */
export function tryParseId(s) {
    let match =  semesterLabelRegex.exec(s)
    return match ? {year: match.groups.year, season: match.groups.season} : null;
}

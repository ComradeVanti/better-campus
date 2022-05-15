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
    let match = semesterLabelRegex.exec(s)
    return match ? {year: parseInt(match.groups.year), season: match.groups.season} : null;
}

/**
 * @param {Date} date
 * @return {?Season}
 */
function tryGetSeason(date) {
    const month = date.getMonth() + 1
    const day = date.getDate()

    if (month === 1 || (month === 2 && day <= 14))
        return Season.Winter
    else if ((month === 2 && day >= 15) || (month > 2 && month < 8) || (month === 8 && day <= 13))
        return Season.Summer
    else if (month >= 9 && month <= 12)
        return Season.Winter
    else
        return null
}

/**
 * @param {Semester} semester
 * @return {boolean}
 */
export function isCurrent(semester) {
    const date = new Date()
    const season = tryGetSeason(date)

    const isCorrectYear = date.getFullYear() === semester.id.year
    const isCorrectSeason = season !== null && season === semester.id.season
    return isCorrectYear && isCorrectSeason
}

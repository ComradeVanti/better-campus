/**
 * @typedef {string} courseName
 */

/**
 * @typedef {Object} Course
 * @property {courseName} name
 * @property {number} id
 */

const courseRegex = /^(?<name>[^ ]+) (?<type>[^ -]+)?[ -]*([a-z]{3}\d{2} ?)*$/

/**
 * @param {Course} course
 * @return {string}
 */
export function nameOf(course) {
    const match = courseRegex.exec(course.name)
    return match ? match.groups.name : course.name
}

/**
 * @param {Course} course
 * @return {string}
 */
export function typeOf(course) {
    const match = courseRegex.exec(course.name)
    const type = match ? match.groups.type : undefined
    return type ?? ""
}

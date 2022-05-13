/**
 * @typedef {string} courseName
 */

/**
 * @typedef {Object} Course
 * @property {courseName} name
 * @property {number} id
 */


/**
 * @param {Course} course
 * @return {string}
 */
export function nameOf(course) {
    return course.name
}

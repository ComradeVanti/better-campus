/**
 * @typedef {string} url
 */

/**
 * @typedef {string} html
 */

/**
 * @typedef {number} id
 */

/**
 * @typedef {Object} Course
 * @property {string} name
 * @property {id} id
 */

/**
 * @typedef {Object} CourseNav
 * @property {Semester[]} semesters
 */

/**
 * @typedef {"label" | "unknown"} ActivityType
 */

/**
 * @typedef {Object} CourseActivity
 * @property {id} id
 * @property {ActivityType} type
 */

/**
 * @typedef {CourseActivity} UnknownActivity
 */

/**
 * @typedef {CourseActivity} LabelActivity
 * @property {string[]} lines
 */

/**
 * @typedef {Object} CourseTopic
 * @property {id} id
 * @property {string} name
 * @property {CourseActivity[]} activities
 */

/**
 * @typedef {Object} CourseContent
 * @property {CourseTopic[]} topics
 */

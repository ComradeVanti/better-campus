import * as Semester from "../../Semester.js";
import * as Course from "../../Course.js";
import * as SessKey from "../../SessKey.js";

/**
 * @typedef {Object} Data
 * @property {Semester[]} semesters
 * @property {SessKey} sessKey
 */

/**
 * @param {string} s
 * @param {string} sub
 * @return {string}
 */
function readAfter(s, sub) {
    const index = s.indexOf(sub)
    if (index === -1) return s
    return s.substring(index + sub.length)
}

/**
 * @param {HTMLElement} courseRoot
 * @return {Course}
 */
function extractCourse(courseRoot) {
    const labelElement = courseRoot.querySelector("span")
    const linkElement = courseRoot.querySelector("a")

    const name = labelElement.innerText
    const id = parseInt(readAfter(linkElement.href, "id="))

    return {name, id}
}

/**
 * @param {HTMLElement} semesterRoot
 * @return {?Semester}
 */
function tryExtractSemester(semesterRoot) {

    const labelElement = semesterRoot.querySelector(".tree_item.branch span")
    const courseElements = semesterRoot.querySelectorAll("ul>li")

    const label = labelElement.textContent

    const id = Semester.tryParseId(label)
    if (!id) return null

    const courses = Array.from(courseElements).map(extractCourse)

    return {id, courses}
}

/**
 * @param {Document} doc
 * @param {Course} course
 * @return {HTMLElement}
 */
function makeCourseDisplay(doc, course) {
    const element = doc.createElement("a")
    element.className = "course"
    element.innerText = Course.nameOf(course)
    element.href = `https://ecampus.fhstp.ac.at/course/view.php?id=${course.id}`
    return element
}

/**
 * @param {Document} doc
 * @param {Semester} semester
 * @return {HTMLElement}
 */
function makeSemesterDisplay(doc, semester) {
    const element = doc.createElement("div")
    element.className = "semester"
    element.innerText = Semester.nameOf(semester)
    semester.courses
        .map(course => makeCourseDisplay(doc, course))
        .forEach(display => element.appendChild(display))

    return element
}

/**
 * @type {ExtractData}
 * @returns Data
 */
export const extract = (doc) => {

    // Extract semesters

    const semesterElements = doc.querySelectorAll("li[aria-labelledby='label_2_68']>ul>li")

    const semesters = Array.from(semesterElements)
        .map(tryExtractSemester)
        .filter(semester => semester != null)

    // Extract sessKey

    const sessKey = SessKey.tryFindIn(doc) || ""
    return {semesters, sessKey}
}

/**
 * @type {InjectData}
 * @param {Data} data
 */
export const inject = (doc, data) => {

    // Inject semesters

    const semestersContainer = doc.querySelector("#semesters")

    data.semesters
        .map(semester => makeSemesterDisplay(doc, semester))
        .forEach(display => semestersContainer.appendChild(display))

    // Inject sessKey

    const logoutLink = doc.querySelector("#logout")
    logoutLink.href = logoutLink.href.replace("[sessKey]", data.sessKey)

}

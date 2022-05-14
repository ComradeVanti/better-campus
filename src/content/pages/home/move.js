import * as Semester from "../../Semester.js";
import * as Course from "../../Course.js";
import * as SessKey from "../../SessKey.js";
import * as HTML from "../../HTML.js";

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

    const html = "<div class=\'course\'>\n    <a class=\'course-link\' href=\'https://ecampus.fhstp.ac.at/course/view.php?id=[id]\'>\n        <span class=\'course-name\'>[name]</span>\n        <span class=\'course-type\'>[type]</span>\n    </a>\n</div>"
    const insertedHtml = HTML.replacePlaceholders(html, [
        ["name", Course.nameOf(course)],
        ["type", Course.typeOf(course)],
        ["id", course.id],
    ])

    return HTML.makeElementFrom(doc, insertedHtml)
}

/**
 * @param {Document} doc
 * @param {Semester} semester
 * @return {HTMLElement}
 */
function makeSemesterDisplay(doc, semester) {

    const makeCourseHTML = course => `<div class='course'>
    <a class='course-link' href='https://ecampus.fhstp.ac.at/course/view.php?id=${course.id}'>
        <span class='course-name'>${Course.nameOf(course)}</span>
        <span class='course-type'>${Course.typeOf(course)}</span>
    </a>
</div>`;

    const makeSemesterHTML = semester => {
        const coursesHTML = semester.courses.map(makeCourseHTML).join("\n")
        return `<div class="semester">
    <span class="semester-name">${Semester.nameOf(semester)}</span>
    <div class="courses">${coursesHTML}</div>
</div>`;
    }

    return HTML.makeElementFrom(doc, makeSemesterHTML(semester))
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

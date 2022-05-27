const sessKeyRegex = /(?<="sesskey":")[^"]+/;
const semesterContainersSelector =
  ".block_navigation>.card-body>.card-text>ul>li>ul>li:nth-child(3)>ul>li:nth-child(n+3)";
const courseInfoRegex =
  /^[- ]*(?<name>.+) ((?<format>[A-Z]{2,3})|-).*\((?<lecturers>.*)\)/;

/**
 * @param {html} html
 * @return {string}
 */
function findSessKey(html) {
  return sessKeyRegex.exec(html)[0];
}

/**
 * @param {string} s
 * @param {string} search
 * @return {string}
 */
function readAfter(s, search) {
  const index = s.indexOf(search);
  return s.substring(index + search.length);
}

/**
 * @param {HTMLElement} element
 * @return {Course}
 */
function extractCourse(element) {
  const linkElement = element.querySelector("a");

  const info = linkElement.title;
  const match = courseInfoRegex.exec(info);
  const name = match.groups.name;

  const link = linkElement.href;
  const id = parseInt(readAfter(link, "="));

  return { name, id };
}

/**
 * @param {HTMLElement} element
 * @return {Semester}
 */
function extractSemester(element) {
  const labelElement = element.querySelector("p");
  const courseElements = Array.from(element.querySelectorAll("ul>li"));

  return {
    name: labelElement.innerText,
    courses: courseElements.map(extractCourse),
  };
}

/**
 * @param {Document} doc
 * @return {Semester[]}
 */
function extractSemesters(doc) {
  const semesterContainers = Array.from(
    doc.querySelectorAll(semesterContainersSelector)
  );
  return semesterContainers.map(extractSemester);
}

/**
 * @type {Scanner}
 */
const scanner = (doc) => {
  const sessKey = findSessKey(doc.head.innerText);

  const semesters = extractSemesters(doc);

  return { sessKey, semesters };
};

export default scanner;

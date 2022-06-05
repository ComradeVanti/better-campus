const sessKeyRegex = /(?<="sesskey":")[^"]+/;
const semesterContainersSelector =
  ".block_navigation>.card-body>.card-text>ul>li>ul>li:nth-child(3)>ul>li:nth-child(n+3)";
const courseInfoRegex =
  /^[- ]*(?<name>.+) ((?<format>[A-Z]{2,3})|-).*\((?<lecturers>.*)\)/;
const semesterIdRegex = /(?<season>WS|SS)(?<year>\d{4})/;

/**
 * @param {string} s
 * @return {SemesterId | null}
 */
function tryParseSemesterId(s) {
  let match = semesterIdRegex.exec(s);
  return match
    ? { year: parseInt(match.groups.year), season: match.groups.season }
    : null;
}

/**
 * @template T
 * @param {(T | null)[]} items
 * @return {T[] | null}
 */
function nullIfAnyNull(items) {
  if (items.findIndex((it) => it === null) !== -1) return null;
  return items;
}

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
 * @return {Semester | null}
 */
function tryExtractSemester(element) {
  const labelElement = element.querySelector("p");
  const courseElements = Array.from(element.querySelectorAll("ul>li"));

  const id = tryParseSemesterId(labelElement.innerText);

  if (id)
    return {
      id,
      courses: courseElements.map(extractCourse),
    };
  else return null;
}

/**
 * @param {Document} doc
 * @return {Semester[] | null}
 */
function tryExtractSemesters(doc) {
  const semesterContainers = Array.from(
    doc.querySelectorAll(semesterContainersSelector)
  );
  return nullIfAnyNull(semesterContainers.map((e) => tryExtractSemester(e)));
}

/**
 * @type {Scanner}
 */
const scanner = (doc) => {
  const sessKey = findSessKey(doc.head.innerText);

  const semesters = tryExtractSemesters(doc);

  return { sessKey, semesters };
};

export default scanner;

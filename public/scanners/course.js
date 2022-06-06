const courseInfoRegex =
  /^[- ]*(?<name>.+) ((?<format>[A-Z]{2,3})|-).*\((?<lecturers>.*)\)/;

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
 * @type {ElementScanner<HTMLElement, string>}
 */
const tryGetCourseName = (element) => {
  const info = element.title;
  const match = courseInfoRegex.exec(info);
  return match ? match.groups.name : null;
};

/**
 * @type {ElementScanner<HTMLLinkElement, number>}
 */
const tryGetId = (element) => {
  const idString = readAfter(element.href, "=");
  return parseInt(idString);
};

/**
 * @type {ElementScanner<HTMLElement, Course>}
 */
export const tryScanCourse = (element) => {
  const linkElement = element.querySelector("a");

  const name = tryGetCourseName(linkElement);
  const id = tryGetId(linkElement);

  return name !== null && id !== null ? { name, id } : null;
};

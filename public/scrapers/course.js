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
 * @type {ScrapeElement<HTMLElement, string>}
 */
const tryScrapeName = (element) => {
  const info = element.title;
  const match = courseInfoRegex.exec(info);
  return match ? match.groups.name : null;
};

/**
 * @type {ScrapeElement<HTMLLinkElement, number>}
 */
const tryScrapeId = (element) => {
  const idString = readAfter(element.href, "=");
  return parseInt(idString);
};

/**
 * @type {ScrapeElement<HTMLElement, Course>}
 */
export const tryScrapeCourse = (element) => {
  const linkElement = element.querySelector("a");

  const name = tryScrapeName(linkElement);
  const id = tryScrapeId(linkElement);

  return name !== null && id !== null ? { name, id } : null;
};

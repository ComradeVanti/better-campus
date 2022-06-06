import { tryScrapeCourse } from "./course.js";
import { tryScanEach } from "./scanUtil.js";

const semesterIdRegex = /(?<season>WS|SS)(?<year>\d{4})/;

/**
 * @param {string} s
 * @return {SemesterId | null}
 */
const tryParseSemesterId = (s) => {
  let match = semesterIdRegex.exec(s);
  return match
    ? { year: parseInt(match.groups.year), season: match.groups.season }
    : null;
};

/**
 * @type {ScrapeElement<HTMLElement, SemesterId>}
 */
const tryScrapeId = (element) => {
  const idText = element.innerText;
  return tryParseSemesterId(idText);
};

/**
 * @type {ScrapeElement<HTMLElement, Semester>}
 */
export const tryScrapeSemester = (element) => {
  const labelElement = element.querySelector("p");
  const courseElements = element.querySelector("ul").children;

  const id = tryScrapeId(labelElement);
  const courses = tryScanEach(courseElements, tryScrapeCourse);

  return id !== null && courses !== null ? { id, courses } : null;
};

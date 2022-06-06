import { tryScanCourse } from "./course.js";
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
 * @type {ElementScanner<HTMLElement, SemesterId>}
 */
const tryGetId = (element) => {
  const idText = element.innerText;
  return tryParseSemesterId(idText);
};

/**
 * @type {ElementScanner<HTMLElement, Semester>}
 */
export const tryExtractSemester = (element) => {
  const labelElement = element.querySelector("p");
  const courseElements = element.querySelector("ul").children;

  const id = tryGetId(labelElement);
  const courses = tryScanEach(courseElements, tryScanCourse);

  return id !== null && courses !== null ? { id, courses } : null;
};

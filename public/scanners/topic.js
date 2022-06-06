import { tryExtractActivity } from "./activity.js";
import { tryScanEach } from "./scanUtil.js";

/**
 * @param {HTMLElement} element
 * @return {id |null}
 */
const tryExtractCourseId = (element) => {
  const attr = element.getAttribute("data-sectionid");
  return attr ? parseInt(attr) : null;
};

/**
 * @param {HTMLElement} element
 * @return {string |null}
 */
const tryExtractCourseName = (element) => {
  const span = element.querySelector(".sectionname span");
  return span ? span.innerText : null;
};

/**
 * @type {ElementScanner<HTMLElement, CourseActivity[]>}
 */
const tryExtractActivities = (element) => {
  const activityElements = element.querySelectorAll(".activity");

  return tryScanEach(activityElements, tryExtractActivity);
};

/**
 * @type {ElementScanner<HTMLElement, CourseTopic>}
 */
export const tryExtractTopic = (element) => {
  const id = tryExtractCourseId(element);
  const name = tryExtractCourseName(element);
  const activities = tryExtractActivities(element);

  return id !== null && name !== null && activities != null
    ? { id, name, activities }
    : null;
};

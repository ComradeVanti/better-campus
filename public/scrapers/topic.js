import { tryScrapeActivity } from "./activity.js";
import { tryScanEach } from "./scanUtil.js";

/**
 * @type {ScrapeElement<HTMLElement, id>}
 */
const tryScrapeId = (element) => {
  const attr = element.getAttribute("data-sectionid");
  return attr ? parseInt(attr) : null;
};

/**
 * @type {ScrapeElement<HTMLElement, string>}
 */
const tryScrapeName = (element) => {
  const span = element.querySelector(".sectionname span");
  return span ? span.innerText : null;
};

/**
 * @type {ScrapeElement<HTMLElement, CourseActivity[]>}
 */
const tryScrapeActivities = (element) => {
  const activityElements = element.querySelectorAll(".activity");

  return tryScanEach(activityElements, tryScrapeActivity);
};

/**
 * @type {ScrapeElement<HTMLElement, CourseTopic>}
 */
export const tryExtractTopic = (element) => {
  const id = tryScrapeId(element);
  const name = tryScrapeName(element);
  const activities = tryScrapeActivities(element);

  return id !== null && name !== null && activities != null
    ? { id, name, activities }
    : null;
};

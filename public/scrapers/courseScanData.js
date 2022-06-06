import { tryScrapeSessKey } from "./sessKey.js";
import { tryScrapeCourseNav } from "./courseNav.js";
import { tryScrapeCourseContent } from "./courseContent.js";

/**
 * @type {ScrapeDoc<CourseScanData>}
 */
export const tryScrapePage = (doc) => {
  const contentElement = doc.querySelector(".course-content");

  const sessKey = tryScrapeSessKey(doc.head);
  const courseNav = tryScrapeCourseNav(doc);
  const courseContent = tryScrapeCourseContent(contentElement);

  return sessKey && courseNav && courseContent
    ? { sessKey, courseNav, courseContent }
    : null;
};

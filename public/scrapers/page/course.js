import { tryScrapeSessKey } from "../sessKey.js";
import { tryScrapeCourseNav } from "../courseNav.js";
import { tryScrapeCourseContent } from "../courseContent.js";

/**
 * @type {ScrapePage<CoursePageData>}
 */
export const tryScrapePage = (element) => {
  const head = document.querySelector("head");
  const contentElement = element.querySelector(".course-content");

  const sessKey = tryScrapeSessKey(head);
  const courseNav = tryScrapeCourseNav(element);
  const courseContent = tryScrapeCourseContent(contentElement);

  return sessKey && courseNav && courseContent
    ? { sessKey, courseNav, courseContent }
    : null;
};

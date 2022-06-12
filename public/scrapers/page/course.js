import { tryScrapeSessKey } from "../data/sessKey.js";
import { tryScrapeCourseNav } from "../data/courseNav.js";
import { tryScrapeCourseContent } from "../data/courseContent.js";
import { nullIfAnyKeyNull } from "../scanUtil.js";

/**
 * @type {ScrapePage<CoursePageData>}
 */
export const tryScrapePage = (element) => {
  const head = document.querySelector("head");
  const contentElement = element.querySelector(".course-content");

  const sessKey = tryScrapeSessKey(head);
  const courseNav = tryScrapeCourseNav(element);
  const courseContent = tryScrapeCourseContent(contentElement);

  return nullIfAnyKeyNull({ sessKey, courseNav, courseContent });
};

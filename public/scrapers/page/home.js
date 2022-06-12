import { tryScrapeSessKey } from "../data/sessKey.js";
import { tryScrapeCourseNav } from "../data/courseNav.js";
import { nullIfAnyKeyNull } from "../scanUtil.js";

/**
 * @type {ScrapePage<HomePageData>}
 */

export const tryScrapePage = (element) => {
  const head = element.querySelector("head");

  const sessKey = tryScrapeSessKey(head);
  const courseNav = tryScrapeCourseNav(element);

  return nullIfAnyKeyNull({ sessKey, courseNav });
};

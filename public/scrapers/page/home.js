import { tryScrapeSessKey } from "../sessKey.js";
import { tryScrapeCourseNav } from "../courseNav.js";
import { nullIfAnyKeyNull } from "../util/scanUtil.js";

/**
 * @type {ScrapePage<HomePageData>}
 */

export const tryScrapePage = (element) => {
  const head = element.querySelector("head");

  const sessKey = tryScrapeSessKey(head);
  const courseNav = tryScrapeCourseNav(element);

  return nullIfAnyKeyNull({ sessKey, courseNav });
};

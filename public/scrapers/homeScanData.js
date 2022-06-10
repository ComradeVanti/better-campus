import { tryScrapeSessKey } from "./sessKey.js";
import { tryScrapeCourseNav } from "./courseNav.js";

/**
 * @type {ScrapeElement<HTMLElement, HomeScanData>}
 */

export const tryScrapePage = (element) => {
  const head = element.querySelector("head");

  const sessKey = tryScrapeSessKey(head);
  const courseNav = tryScrapeCourseNav(element);

  return sessKey && courseNav ? { sessKey, courseNav } : null;
};

import { tryScrapeSessKey } from "./sessKey.js";
import { tryScrapeCourseNav } from "./courseNav.js";

/**
 * @type {ScrapeDoc<HomeScanData>}
 */

export const tryScrapePage = (doc) => {
  const sessKey = tryScrapeSessKey(doc.head);
  const courseNav = tryScrapeCourseNav(doc);

  return sessKey && courseNav ? { sessKey, courseNav } : null;
};

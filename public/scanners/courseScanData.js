import scanSessKey from "./sessKey.js";
import scanCourseNav from "./courseNav.js";

/**
 * @type {Scanner<CourseScanData>}
 */

const scanner = (doc) => {
  const sessKey = scanSessKey(doc);
  const courseNav = scanCourseNav(doc);

  return sessKey && courseNav ? { sessKey, courseNav } : null;
};

export default scanner;

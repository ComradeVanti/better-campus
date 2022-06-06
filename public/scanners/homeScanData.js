import scanSessKey from "./sessKey.js";
import scanCourseNav from "./courseNav.js";

/**
 * @type {Scanner<HomeScanData>}
 */

const scanner = (doc) => {
  const sessKey = scanSessKey(doc);
  const semesters = scanCourseNav(doc);

  return sessKey && semesters ? { sessKey, semesters } : null;
};

export default scanner;

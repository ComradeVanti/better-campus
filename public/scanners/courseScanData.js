import scanSessKey from "./sessKey.js";
import scanCourseNav from "./courseNav.js";
import scanCourseContent from "./courseContent.js";

/**
 * @type {Scanner<CourseScanData>}
 */
const scanner = (doc) => {
  const sessKey = scanSessKey(doc);
  const courseNav = scanCourseNav(doc);
  const courseContent = scanCourseContent(doc);

  return sessKey && courseNav && courseContent
    ? { sessKey, courseNav, courseContent }
    : null;
};

export default scanner;

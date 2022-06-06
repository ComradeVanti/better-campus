import { tryExtractSemester } from "./semester.js";
import { tryScanEach } from "./scanUtil.js";

const semesterContainersSelector =
  ".block_navigation>.card-body>.card-text>ul>li>ul>li:nth-child(3)>ul>li:nth-child(n+3)";

/**
 * @type {DocScanner<CourseNav>}
 */
const scanner = (doc) => {
  const semesterContainers = doc.querySelectorAll(semesterContainersSelector);
  const semesters = tryScanEach(semesterContainers, tryExtractSemester);
  return semesters !== null ? { semesters } : null;
};

export default scanner;

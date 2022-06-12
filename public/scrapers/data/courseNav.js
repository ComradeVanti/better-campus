import { tryScrapeSemester } from "./semester.js";
import { nullIfAnyKeyNull, tryScanEach } from "../scanUtil.js";

const semesterContainersSelector =
  ".block_navigation>.card-body>.card-text>ul>li>ul>li:nth-child(3)>ul>li:nth-child(n+3)";

/**
 * @type {ScrapeElement<HTMLElement, CourseNav>}
 */
export const tryScrapeCourseNav = (element) => {
  const semesterContainers = element.querySelectorAll(
    semesterContainersSelector
  );
  const semesters = tryScanEach(semesterContainers, tryScrapeSemester);
  return nullIfAnyKeyNull({ semesters });
};

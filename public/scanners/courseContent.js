/**
 * @template T
 * @param {(T | null)[]} items
 * @return {T[] | null}
 */
function nullIfAnyNull(items) {
  if (items.findIndex((it) => it === null) !== -1) return null;
  return items;
}

/**
 * @param {Document} doc
 * @return {HTMLElement[]}
 */
const tryFindTopicElements = (doc) =>
  Array.from(doc.querySelectorAll(".course-content .topics>li"));

/**
 * @param {HTMLElement} element
 * @return {id |null}
 */
const tryExtractCourseId = (element) => {
  const attr = element.getAttribute("data-sectionid");
  return attr ? parseInt(attr) : null;
};

/**
 * @param {HTMLElement} element
 * @return {string |null}
 */
const tryExtractCourseName = (element) => {
  const span = element.querySelector(".sectionname span");
  return span ? span.innerText : null;
};

/**
 * @param {HTMLElement} element
 * @return {CourseTopic | null}
 */
const tryExtractTopic = (element) => {
  const id = tryExtractCourseId(element);
  const name = tryExtractCourseName(element);

  return id !== null && name !== null ? { id, name } : null;
};

/**
 * @type {Scanner<CourseContent>}
 */
const scanner = (doc) => {
  const topicElements = tryFindTopicElements(doc);
  const topics = nullIfAnyNull(topicElements.map((e) => tryExtractTopic(e)));
  return topics ? { topics } : null;
};

export default scanner;

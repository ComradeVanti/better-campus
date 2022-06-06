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
 * @param {id} id
 * @return {LabelActivity | null}
 */
const tryExtractLabel = (element, id) => {
  /**
   * @type {HTMLElement[]}
   */
  const lineElements = Array.from(element.querySelectorAll("p,span,strong,b"));
  const lines = lineElements
    .filter((lineElement) => lineElement.childElementCount === 0)
    .map((lineElement) => lineElement.innerText)
    .filter((line) => line.length > 0);
  return { id, type: "label", lines };
};

/**
 * @param {HTMLElement} element
 * @return {CourseActivity| null}
 */
const tryExtractActivity = (element) => {
  const id = parseInt(element.id.substring(6));

  const isActivityOfType = (type) => element.classList.contains(type);

  return isActivityOfType("label")
    ? tryExtractLabel(element, id)
    : { id, type: "unknown" };
};

/**
 * @param {HTMLElement} element
 * @return {CourseActivity[] | null}
 */
const tryExtractActivities = (element) => {
  const activityElements = Array.from(element.querySelectorAll(".activity"));

  return nullIfAnyNull(activityElements.map((e) => tryExtractActivity(e)));
};

/**
 * @param {HTMLElement} element
 * @return {CourseTopic | null}
 */
const tryExtractTopic = (element) => {
  const id = tryExtractCourseId(element);
  const name = tryExtractCourseName(element);
  const activities = tryExtractActivities(element);

  return id !== null && name !== null && activities != null
    ? { id, name, activities }
    : null;
};

/**
 * @type {Scanner<CourseContent>}
 */
const scanner = (doc) => {
  const topicElements = tryFindTopicElements(doc);
  const topics = nullIfAnyNull(
    topicElements.map((e) => tryExtractTopic(e))
  )?.filter((topic) => topic.activities.length > 0); // Filter out empty topics
  return topics ? { topics } : null;
};

export default scanner;

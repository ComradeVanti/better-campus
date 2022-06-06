/**
 * @param {HTMLElement} element
 * @param {id} id
 * @return {LabelActivity | null}
 */
const tryScrapeLabel = (element, id) => {
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
 * @type {ScrapeElement<HTMLElement, CourseActivity>}
 */
export const tryScrapeActivity = (element) => {
  const id = parseInt(element.id.substring(6));

  const isActivityOfType = (type) => element.classList.contains(type);

  return isActivityOfType("label")
    ? tryScrapeLabel(element, id)
    : { id, type: "unknown" };
};

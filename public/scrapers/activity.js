import { findTextUnder } from "./scanUtil.js";

/**
 * @param {HTMLElement} element
 * @param {id} id
 * @return {UnknownActivity}
 */
const scrapeUnknown = (element, id) => ({ id, type: "unknown" });

/**
 * @param {HTMLElement} element
 * @param {id} id
 * @return {LabelActivity | UnknownActivity | null}
 */
const tryScrapeLabel = (element, id) => {
  const paragraphElement = element.querySelector(".no-overflow>p");
  if (paragraphElement) {
    const textHtml = paragraphElement.innerHTML;
    return { id, type: "label", textHtml };
  }

  // TODO: Handle images

  return scrapeUnknown(element, id);
};

/**
 * @param {HTMLElement} element
 * @param {id} id
 * @return {UrlActivity | null}
 */
const tryScrapeUrl = (element, id) => {
  const url = element.querySelector("a").href;
  const linkName =
    element.querySelector(".instancename").firstChild.textContent;

  const afterContentElement = element.querySelector(".contentafterlink");
  const lines = afterContentElement ? findTextUnder(afterContentElement) : [];

  return { id, type: "url", url, linkName, lines };
};

/**
 * @type {ScrapeElement<HTMLElement, CourseActivity>}
 */
export const tryScrapeActivity = (element) => {
  const id = parseInt(element.id.substring(6));

  const isActivityOfType = (type) => element.classList.contains(type);

  /**
   * @type {function(HTMLElement, id) : CourseActivity | null}
   */
  const scraper =
    [
      ["label", tryScrapeLabel],
      ["url", tryScrapeUrl],
    ]
      .find((it) => isActivityOfType(it[0]))
      ?.at(1) ?? scrapeUnknown;

  return scraper(element, id);
};

import { nullIfAnyKeyNull, readAfter } from "./scanUtil.js";

const courseInfoRegex =
  /^[- ]*(?<name>.+) ((?<format>[A-Z]{2,3})|-).*\((?<lecturers>.*)\)/;

/**
 * @type {ScrapeElement<HTMLElement, string>}
 */
const tryScrapeName = (element) => {
  const info = element.title;
  const match = courseInfoRegex.exec(info);
  return match ? match.groups.name : null;
};

/**
 * @type {ScrapeElement<HTMLLinkElement, number>}
 */
const tryScrapeId = (element) => {
  const idString = readAfter(element.href, "=");
  return parseInt(idString);
};

/**
 * @type {ScrapeElement<HTMLElement, Course>}
 */
export const tryScrapeCourse = (element) => {
  const linkElement = element.querySelector("a");

  const name = tryScrapeName(linkElement);
  const id = tryScrapeId(linkElement);

  return nullIfAnyKeyNull({ name, id });
};

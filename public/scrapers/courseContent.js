import { tryExtractTopic } from "./topic.js";
import { tryScanEach } from "./scanUtil.js";

/**
 * @type {ScrapeElement<HTMLElement, CourseContent>}
 */
export const tryScrapeCourseContent = (element) => {
  const topicElements = element.querySelectorAll(".topics>li");
  const topics = tryScanEach(topicElements, tryExtractTopic)?.filter(
    (topic) => topic.activities.length > 0
  ); // Filter out empty topics
  return topics ? { topics } : null;
};

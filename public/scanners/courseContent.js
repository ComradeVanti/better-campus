import { tryExtractTopic } from "./topic.js";
import { tryScanEach } from "./scanUtil.js";

/**
 * @type {DocScanner<CourseContent>}
 */
const scanner = (doc) => {
  const topicElements = doc.querySelectorAll(".course-content .topics>li");
  const topics = tryScanEach(topicElements, tryExtractTopic)?.filter(
    (topic) => topic.activities.length > 0
  ); // Filter out empty topics
  return topics ? { topics } : null;
};

export default scanner;

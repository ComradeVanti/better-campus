import { tryScrapeLoginToken } from "../loginToken.js";
import { nullIfAnyKeyNull } from "../util/scanUtil.js";

/**
 * @type {ScrapePage<LoginPageData>}
 */
export const tryScrapePage = (element) => {
  const loginToken = tryScrapeLoginToken(element);

  return nullIfAnyKeyNull({ loginToken });
};

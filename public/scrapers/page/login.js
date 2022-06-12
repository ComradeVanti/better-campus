import { tryScrapeLoginToken } from "../data/loginToken.js";
import { nullIfAnyKeyNull } from "../scanUtil.js";

/**
 * @type {ScrapePage<LoginPageData>}
 */
export const tryScrapePage = (element) => {
  const loginToken = tryScrapeLoginToken(element);

  return nullIfAnyKeyNull({ loginToken });
};

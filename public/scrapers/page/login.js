import { tryScrapeLoginToken } from "../loginToken.js";

/**
 * @type {ScrapePage<LoginPageData>}
 */
export const tryScrapePage = (element) => {
  const loginToken = tryScrapeLoginToken(element);

  return loginToken ? { loginToken } : null;
};

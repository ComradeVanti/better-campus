import { tryScrapeLoginToken } from "./loginToken.js";

/**
 * @type {ScrapeElement<HTMLElement, LoginScanData>}
 */
export const tryScrapePage = (element) => {
  const loginToken = tryScrapeLoginToken(element);

  return loginToken ? { loginToken } : null;
};

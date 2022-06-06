import { tryScrapeLoginToken } from "./loginToken.js";

/**
 * @type {ScrapeDoc<LoginScanData>}
 */
export const tryScrapePage = (doc) => {
  const loginToken = tryScrapeLoginToken(doc);

  return loginToken ? { loginToken } : null;
};

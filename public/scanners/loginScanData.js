import scanLoginToken from "./loginToken.js";

/**
 * @type {DocScanner<LoginScanData>}
 */
export default (doc) => {
  const loginToken = scanLoginToken(doc);

  return loginToken ? { loginToken } : null;
};

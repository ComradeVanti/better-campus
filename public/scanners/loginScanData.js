import scanLoginToken from "./loginToken.js";

/**
 * @type {Scanner<LoginScanData>}
 */
export default (doc) => {
  const loginToken = scanLoginToken(doc);

  return loginToken ? { loginToken } : null;
};

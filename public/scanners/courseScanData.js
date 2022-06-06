import scanSessKey from "./sessKey.js";

/**
 * @type {Scanner<CourseScanData>}
 */

const scanner = (doc) => {
  const sessKey = scanSessKey(doc);
  return sessKey ? { sessKey } : null;
};

export default scanner;

/**
 * @type {Scanner<string>}
 */
const scanner = (doc) => {
  /**
   * @type {HTMLInputElement|null}
   */
  const element = doc.querySelector("input[name='logintoken']");
  return element?.value ?? null;
};

export default scanner;

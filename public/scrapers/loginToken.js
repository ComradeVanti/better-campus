/**
 * @type {ScrapeDoc<string>}
 */
export const tryScrapeLoginToken = (doc) => {
  /**
   * @type {HTMLInputElement|null}
   */
  const element = doc.querySelector("input[name='logintoken']");
  return element?.value ?? null;
};

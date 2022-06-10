/**
 * @type {ScrapeElement<HTMLElement, string>}
 */
export const tryScrapeLoginToken = (element) => {
  const input = element.querySelector("input[name='logintoken']");
  return input?.value ?? null;
};

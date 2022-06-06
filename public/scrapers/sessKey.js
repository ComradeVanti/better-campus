const sessKeyRegex = /(?<="sesskey":")[^"]+/;

/**
 * @type {ScrapeElement<HTMLHeadElement, string>}
 */
export const tryScrapeSessKey = (head) => {
  const match = sessKeyRegex.exec(head.innerText);
  return match ? match[0] : null;
};

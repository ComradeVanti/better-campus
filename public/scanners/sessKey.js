const sessKeyRegex = /(?<="sesskey":")[^"]+/;

/**
 * @type {Scanner<string>}
 */
const scanner = (doc) => {
  const headerHtml = doc.head.innerText;
  const match = sessKeyRegex.exec(headerHtml);
  return match ? match[0] : null;
};

export default scanner;

const sessKeyRegex = /(?<="sesskey":")[^"]+/;

/**
 * @type {DocScanner<string>}
 */
const scanner = (doc) => {
  const match = sessKeyRegex.exec(doc.head.innerText);
  return match ? match[0] : null;
};

export default scanner;

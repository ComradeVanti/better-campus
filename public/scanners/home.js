const sessKeyRegex = /(?<="sesskey":")[^"]+/;

/**
 * @param {html} html
 * @return {string}
 */
function findSessKey(html) {
  return sessKeyRegex.exec(html)[0];
}

/**
 * @type {Scanner}
 */
const scanner = (doc) => {
  const sessKey = findSessKey(doc.head.innerText);
  return { sessKey };
};

export default scanner;

/**
 * @param {string} s
 * @param {string} search
 * @return {string}
 */
export function readAfter(s, search) {
  const index = s.indexOf(search);
  return s.substring(index + search.length);
}

/**
 * @template T
 * @param {(T | null)[]} items
 * @return {T[] | null}
 */
function nullIfAnyNull(items) {
  if (items.findIndex((it) => it === null) !== -1) return null;
  return items;
}

/**
 * @param {Record<string, any | null>} o
 * @return {null | Record<string, any>}
 */
export function nullIfAnyKeyNull(o) {
  return Object.values(o).every((it) => it !== null) ? o : null;
}

/**
 * @template E
 * @template T
 * @param {ArrayLike<E> | HTMLCollection | E[]} elements
 * @param {ScrapeElement<E,T>} scanner
 * @return {T[] | null}
 */
export function tryScanEach(elements, scanner) {
  const scanned = Array.from(elements).map((e) => scanner(e));
  return nullIfAnyNull(scanned);
}

/**
 * @param {HTMLElement} element
 * @return {string[]}
 */
export function findTextUnder(element) {
  let node;
  /**
   * @type {Node[]}
   */
  let textNodes = [];
  let walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while ((node = walk.nextNode())) textNodes.push(node);
  return textNodes.map((n) => n.textContent);
}

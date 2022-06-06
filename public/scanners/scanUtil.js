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
 * @template E
 * @template T
 * @param {ArrayLike<E> | HTMLCollection | E[]} elements
 * @param {ElementScanner<E,T>} scanner
 * @return {T[] | null}
 */
export function tryScanEach(elements, scanner) {
  const scanned = Array.from(elements).map((e) => scanner(e));
  return nullIfAnyNull(scanned);
}

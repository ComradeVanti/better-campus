/**
 * @typedef {Object} SemesterId
 * @property {number} year
 * @property {Season} season
 */

/**
 * @typedef {Object} Semester
 * @property {SemesterId} id
 * @property {Course[]} courses
 */

import * as Season from "@/domain/Season";

/**
 * @param {Semester} semester
 * @return {boolean}
 */
export function isCurrent(semester) {
  const date = new Date();
  const yearIsCorrect = semester.id.year === date.getFullYear();
  const seasonIsCorrect = semester.id.season === Season.tryGetSeasonOf(date);
  return yearIsCorrect && seasonIsCorrect;
}

/**
 * @param {Semester} semester
 * @return {string}
 */
export function getDisplayName(semester) {
  return `${semester.id.season}${semester.id.year}`;
}

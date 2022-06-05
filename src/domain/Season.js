/**
 *@readonly
 * @enum {string}
 */
export const Season = Object.freeze({
  Winter: "WS",
  Summer: "SS",
});

/**
 * @param {Date} date
 * @return {Season | null}
 */
export function tryGetSeasonOf(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 1 || (month === 2 && day <= 14)) return Season.Winter;
  else if (
    (month === 2 && day >= 15) ||
    (month > 2 && month < 8) ||
    (month === 8 && day <= 13)
  )
    return Season.Summer;
  else if (month >= 9 && month <= 12) return Season.Winter;
  else return null;
}

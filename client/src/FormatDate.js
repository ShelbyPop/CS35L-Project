/**
 * Formats input seconds into MM:SS format
 *
 * @export
 * @param {string} seconds
 * @return {string} String formatted as MM:SS (minutes:seconds)
 */
export function formatTime(seconds) {
  const sec = Number(seconds) % 60;
  const formatSec = (sec < 10) ? ("0" + sec) : sec;
  const min = Math.floor(seconds / 60);
  const formatMin = (min < 10) ? ("0" + min) : min;
  return formatMin + ":" + formatSec;
}

/**
 * Reformats a string representing a Date object to exclude time zone
 *
 * @export
 * @param {string} dateString
 * @return {string} Reformatted Date string
 */
export function formatDate(dateString) {
  return dateString.slice(4, dateString.length-33);
}
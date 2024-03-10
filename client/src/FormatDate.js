// Given a number of seconds, return a string in the format MM:SS (minutes:seconds)
export function formatTime(seconds) {
  const sec = Number(seconds) % 60;
  const formatSec = (sec < 10) ? ("0" + sec) : sec;
  const min = Math.floor(seconds / 60);
  const formatMin = (min < 10) ? ("0" + min) : min;
  return formatMin + ":" + formatSec;
}
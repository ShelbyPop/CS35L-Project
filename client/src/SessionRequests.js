// Helper functions for modifying or accessing a user's sessions

/**
 * Creates a session, given a user's username and Date objects startTime, endTime
 *
 * @export
 * @param {string} username
 * @param {Date} startTime
 * @param {Date} endTime
 * @param {number} sessionLength
 * @return {boolean} True on session creation success, false on failure
 */
export async function createSession(username, startTime, endTime, sessionLength) {
  const obj = {
    username: username,
    startTime: startTime,
    endTime: endTime,
    sessionLength: sessionLength
  };
  const response = await fetch(
    `http://localhost:5050/sessions/create?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log("Successfully inserted session");
    const data = await response.json();
    console.log(data);
    return true;
  } else {
    console.log("Ran into an issue while attempting to insert session");
    return false;
  }
}

/**
 * Returns an array of all of a user's sessions
 *
 * @export
 * @param {string} username
 * @return {Object[]} Array of user sessions on request success, null on failure
 */
export async function getUserSessions(username) {
  const obj = { username: username };
  const response = await fetch(`http://localhost:5050/sessions/user?${new URLSearchParams(obj)}`);

  console.log(response);
  if (response.ok) {
    console.log("Successfully retrieved user sessions");
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log("Ran into an issue while attempting to insert session");
    return null;
  }
}

/**
 * Parses the array returned by getUserSessions() into an object with various user statistics:
 * most recent session, total number of sessions, total time spent focusing, and average session length
 * 
 * @export
 * @param {string} username
 * @return {Object} Statistics for the user's sessions 
 */
export async function parseUserSessions (username) {
  const userSessionsArray = await getUserSessions(username);
  const totalSessions = userSessionsArray.length;
  const lastSession = userSessionsArray.length ? userSessionsArray[totalSessions-1].endTime : null;
  const sessionLengthArray = userSessionsArray.map((session) => Number(session.sessionLength));
  console.log(sessionLengthArray);
  const totalFocusTime = sessionLengthArray.reduce(
    (accumulator, currLength) => accumulator + currLength, 0
  );
  const averageSessionLength = Math.round(totalFocusTime / totalSessions);

  const stats = {
    lastSession,
    totalSessions,
    totalFocusTime,
    averageSessionLength
  };
  console.log(stats);
  return stats;
}
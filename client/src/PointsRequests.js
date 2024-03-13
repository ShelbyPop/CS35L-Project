// Helper functions for getting/setting points for a user

/**
 * Gets user's total points
 *
 * @export
 * @param {string} username
 * @return {string} User's point total represented as a string on success, null on failure
 * 
 * @example
 * 
 * useEffect(() => {
 *  getPoints(username).then((points) => setPoints(points));
 *  }, [username]);
 */
export async function getPoints(username) {
  const obj = { username: username };
  const response = await fetch(
    `http://localhost:5050/users/points/get?${new URLSearchParams(obj)}`
  );

  console.log(response);
  if (response.ok) {
    console.log("Retrieved user's points");
    const data = await response.json();
    return data;
  } else {
    console.log("Ran into an issue while attempting to retrieve points");
    return null;
  }
}

/**
 * Given a user's username as a string, adds diff points (negative values also ok) to that user's points
 * 
 * @export
 * @param {string} username - user's username (string)
 * @param {number} diff - the requested addition (or subtraction) of points from a user's account
 * @return {boolean} True on addition (or subtraction) success, false on failure 
 * 
 * @example
 * 
 * // subtract 5 points
 * addPoints(username, -5)
 */
export async function addPoints(username, diff) {
  const obj = { username: username, diff: diff };
  const response = await fetch(
    `http://localhost:5050/users/points/add?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log("Successfully changed user's points");
    return true;
  } else {
    console.log("Ran into an issue while attempting to change points");
    return false;
  }
}
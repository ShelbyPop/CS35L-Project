// Helper functions for modifying a user's sessions

// Create a session, given a user's username and Date objects startTime, endTime
export async function createSession(username, startTime, endTime) {
  // Calculate session length in seconds
  const sessionLength = Math.round(((new Date()) - startTime) / 1000);
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
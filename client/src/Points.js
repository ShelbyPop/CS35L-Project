// Helper functions for getting/setting points for a user

// Given a user's username as a string, return the number of points of that user

// Usage: 
// Use these lines exactly whenever you need a user's point total in a react component
// const [points, setPoints] = useState("");
// useEffect(() => {
//   getPoints(username).then((points) => setPoints(points));
// }, [username]);

// Or, if you can use async function (e.g. in a listener like this), do it like this example
// const handleGetPoints = async (username) => {
//   const result = await getPoints(username);
//   (result === null) ? alert("Bad request") : alert(`${username} has ${result} points`)
// };
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
    console.log("Ran into an issue");
    return null;
  }
}

// Given a user's username as a string, add diff points (negative values also ok) to that user's points
// Return true if points were successfully added

// Usage: addPoints(username, 5) to add 5 points, addPoints(username, -5) to subtract 5 points
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
    console.log("Ran into an issue");
    return false;
  }
}
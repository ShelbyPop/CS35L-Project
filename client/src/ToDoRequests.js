// Helper functions for modifying todos for a user

/**
 * Gets array of all todos for user
 *
 * @export
 * @param {string} username
 * @return {Object[]} Array of all todos for user on success, null on failure
 */
export async function getToDos(username) {
  const obj = { username: username };
  const response = await fetch(
    `http://localhost:5050/todos/get?${new URLSearchParams(obj)}`
  );

  console.log(response);
  if (response.ok) {
    console.log(`Successfully retrieved todos for ${username}`);
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log(`Ran into an issue while attempting to retrieve todos for ${username}`);
    return null;
  }
}

/**
 * Creates a todo, given a user and input text
 *
 * @export
 * @param {string} username
 * @param {string} text
 * @return {Object} The newly created todo on success, null on failure
 */
export async function createToDo(username, text) {
  const obj = {
    username: username,
    text: text
  };
  const response = await fetch(
    `http://localhost:5050/todos/create?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log("Successfully inserted todo");
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log("Ran into an issue while attempting to insert todo");
    return null;
  }
}

/**
 * Toggles completion of a todo, given its id
 *
 * @export
 * @param {string} id
 * @return {Object} The newly updated todo on success, null on failure 
 */
export async function toggleToDo(id) {
  const obj = { id: id };
  const response = await fetch(
    `http://localhost:5050/todos/toggle?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log(`Successfully toggled completion of todo ${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log(`Ran into an issue while attempting to toggle completion of todo ${id}`);
    return null;
  }
}

/**
 * Deletes a todo, given its id
 *
 * @export
 * @param {string} id
 * @return {boolean} True on todo deletion success, false on failure 
 */
export async function deleteToDo(id) {
  const obj = { id: id };
  const response = await fetch(
    `http://localhost:5050/todos/delete?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log(`Successfully deleted todo ${id}`);
    return true;
  } else {
    console.log(`Ran into an issue while attempting to toggle completion of todo ${id}`);
    return false;
  }
}
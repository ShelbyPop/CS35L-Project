// Helper functions for modifying todos for a user

// Create a todo, given a user and input text
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

// Get array of all todos for user
export async function getToDos(username) {
  const obj = {
    username: username,
  };
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

// Toggle completion of a todo, given its id
export async function toggleToDo(id) {
  const obj = {
    id: id
  };
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
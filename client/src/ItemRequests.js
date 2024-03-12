// Helper functions for accessing or adding to a user's items

export const allItems = ["coffee", "cakes", "pies", "donuts", "waffles", "misc"];

export async function getItemCount(username, item) {
  if (!allItems.includes(item)) {
    console.log(`Item does not exist: ${item}`);
    return null;
  }

  const obj = { username: username, item: item };
  const response = await fetch(
    `http://localhost:5050/users/items/get?${new URLSearchParams(obj)}`
  );

  console.log(response);
  console.log(response.status);
  if (response.ok) {
    console.log(`Retrieved user's ${item} count`);
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log(`Ran into an issue while attempting to get user's ${item} count`);
    return null;
  }
}

export async function addItem(username, item) {
  if (!allItems.includes(item)) {
    console.log(`Item does not exist: ${item}`);
    return false;
  }

  const obj = { username: username, item: item };
  const response = await fetch(
    `http://localhost:5050/users/items/add?${new URLSearchParams(obj)}`,
    {method: 'POST'}
  );

  console.log(response);
  if (response.ok) {
    console.log(`Successfully added 1 to ${item}`);
    return true;
  } else {
    console.log(`Ran into an issue while attempting to change ${item} count`);
    return false;
  }
}
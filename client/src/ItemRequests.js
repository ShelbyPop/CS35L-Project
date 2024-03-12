// Helper functions for accessing or adding to a user's items

export const allItems = ["coffee", "cakes", "pies", "donuts", "waffles", "misc"];

// Get the count of an item in a user's inventory
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
  if (response.ok) {
    console.log(`Retrieved user's ${item} count`);
    const data = await response.json();
    console.log(`${item}: ${data}`);
    return data;
  } else {
    console.log(`Ran into an issue while attempting to get user's ${item} count`);
    return null;
  }
}

// Add one to the count of item in a user's inventory
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

// Get an array of the count of all items in a user's inventory, in the same order as allItems
export async function getAllItemCounts(username) {
  let newItemCt = Array(allItems.length).fill(null);
  for (let i = 0; i < allItems.length; i++) {
    const count = await getItemCount(username, allItems[i]);
    newItemCt[i] = count;
  }

  console.log(newItemCt);
  return newItemCt;
}
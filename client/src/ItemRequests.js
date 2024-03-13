// Helper functions for accessing or adding to a user's items

export const allItems = ["coffee", "cakes", "pies", "donuts", "waffles", "misc"];

/**
 * Gets the item count of a certain item in a user's inventory saved to the database
 *
 * @export
 * @param {string} username
 * @param {string} item - the item to be counted
 * @return {string} Item count represented as string on success, null on failure 
 */
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

/**
 * Increments count of item in user's profile stats on the database
 *
 * @export
 * @param {string} username
 * @param {string} item - relevant item being added
 * @return {boolean} True on success, false on failure
 */
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

/**
 * Gets a count in an array of all items in the user's inventory, same order as allItems[]
 *
 * @export
 * @param {string} username
 * @return {string[]} Array of all item counts, represented as strings 
 */
export async function getAllItemCounts(username) {
  let newItemCt = Array(allItems.length).fill(null);
  for (let i = 0; i < allItems.length; i++) {
    const count = await getItemCount(username, allItems[i]);
    newItemCt[i] = count;
  }

  console.log(newItemCt);
  return newItemCt;
}
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import sha256 from 'crypto-js/sha256.js';

const app = express();
app.use(cors());
const uri =
  "mongodb+srv://Cluster06218:dj9ZW9n0VECoINZe@cluster06218.af6kogl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster06218";
const client = new MongoClient(uri);
const users = client.db("database").collection("users");
const sessions = client.db("database").collection("sessions");
const todos = client.db("database").collection("todos");
// MongoDB documentation: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const allItems = ["coffee", "cakes", "pies", "donuts", "waffles", "misc"];

/**
 * Connects to MongoDB server
 *
 */
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Failed to connect to MongoDB server:", error);
    process.exit(1); // Exit the process if unable to connect
  }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

/**
 * Gets array of all users matching username
 *
 * @param {string} username
 * @return {Object[]} Array of MongoDB documents in the users collection, with matching username 
 */
async function getUser(username) {
  const cursor = users.find({ username: username });
  const user = await cursor.toArray();
  console.log(user);
  return user;
}

/**
 * Given a number of users, checks if numUsers is 1 and prints error messages to console if not
 *
 * @param {number} numUsers
 * @return {boolean} True if numUsers is 1, else false
 */
function isValidUser(numUsers) {
  if (numUsers > 1) {
    console.log("Too many users, please fix bug!!");
    return false;
  } else if (numUsers === 0) {
    console.log("User does not exist");
    return false;
  }
  return true;
}

/**
 * Inserts new user into users collection with empty sessions array
 *
 * @param {string} username
 * @param {string} password
 * @return {Object} MongoDB document containing a boolean and the id of the inserted document on success
 */
async function createUser(username, password) {
  const user = await getUser(username);
  // Return if username already exists
  if (user.length) {
    return;
  }
  // Hash the password before storing it
  const hashedPass = sha256(password).toString();
  return await users.insertOne({
    username: username,
    password: hashedPass,
    points: "0",
    coffee: "0",
    cakes: "0",
    pies: "0",
    donuts: "0", 
    waffles: "0", 
    misc: "0"
  });
}

/**
 * Validates existence of user with matching password in collection
 *
 * @param {string} username
 * @param {string} password
 * @return {boolean} True if exactly 1 user exists and password matches stored password, else false
 */
async function loginUser(username, password) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return false;
  }
  // Hash the input password before compared it to the (hashed) correct password
  const hashedPass = sha256(password).toString();
  console.log(`${user[0].password}, ${hashedPass}`);
  return (user.length === 1 && user[0].password === hashedPass);
}

/**
 * Gets number of points of user
 *
 * @param {string} username
 * @return {string} Number of points stored for a user as a string if user exists, else null
 */
async function getUserPoints(username) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return null;
  }
  return (user[0].points);
}

/**
 * Adds points to user
 *
 * @param {string} username
 * @param {string} diff - number of points to add/subtract
 * @return {boolean} True if success, false if user not found
 */
async function addUserPoints(username, diff) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return false;
  }

  // Calculate newPoints, set to 0 if the change would result in negative points
  let newPoints = Number(user[0].points) + Number(diff);
  if (newPoints < 0) {
    newPoints = 0;
  }
  console.log(newPoints);

  // Update value of points to newPoints
  const updateDocument = {
    $set: { points: newPoints.toString() }
  };
  await users.updateOne({ username: username }, updateDocument);
  return true;
}

/**
 * Checks how many of a given item a user has
 *
 * @param {string} username
 * @param {string} item - name of item type to be counted, must be in allItems array
 * @return {string} Number of item (as a string) that the given user has on success, null on failure 
 */
async function getUserItemCount(username, item) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return null;
  }
  if (allItems.includes(item)) {
    return (user[0][item]);
  }
  console.log(`Invalid item given: ${item}`);
  return null;
}

/**
 * Adds 1 to a user's item count for a specified item
 *
 * @param {string} username
 * @param {string} item - name of item type to be incremented, must be in allItems array
 * @return {boolean} True on update success, else false
 */
async function addUserItem(username, item) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return false;
  }
  if (allItems.includes(item)) {
    const newCount = Number(user[0][item]) + 1;
    await users.updateOne({ username: username }, { $set: { [item]: newCount.toString() } });
    return true;
  }
  console.log(`Invalid item given: ${item}`);
  return false;
}

/**
 * Inserts a new session into the sessions collection
 *
 * @param {string} username
 * @param {string} startTime - Date string representing session start time
 * @param {string} endTime - Date string representing session end time
 * @param {string} sessionLength - length of session, in seconds & represented as string
 * @return {Object} MongoDB document containing a boolean and the id of the inserted document on success,
 *  else null if invalid user/start time/end time
 */
async function createSession(username, startTime, endTime, sessionLength) {
  // Only insert session if user is signed in and startTime/endTime is valid
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return null;
  }
  if (startTime === null || endTime === null) {
    console.log("Session times invalid");
    return null;
  }

  return await sessions.insertOne({
    username: username,
    startTime: startTime,
    endTime: endTime,
    sessionLength: sessionLength
  });
}

/**
 * Inserts a new todo associated with a given user
 *
 * @param {string} username
 * @param {string} text - user-inputted description for the todo
 * @return {Object} MongoDB document containing a boolean and the id of the inserted document on success,
 *  else null if another todo with the same text exists or if user is invalid
 */
async function createToDo(username, text) {
  const user = await getUser(username);
  if (!isValidUser(user.length)) {
    return null;
  }
  if (!text) {
    console.log("Invalid todo text");
    return null;
  }
  
  // Only allow insertion if there is no other task with the same text
  const cursor = todos.find({ username: username, text: text });
  const todo = await cursor.toArray();
  if (todo.length > 0) {
    console.log("Duplicate todo not allowed");
    return null;
  }

  return await todos.insertOne({
    username: username,
    text: text,
    completed: false
  });
}

/**
 * Toggles the "completed" property for the todo matching objId
 *
 * @param {ObjectId} objId - MongoDB ObjectId of the existing todo
 * @return {Object} MongoDB document containing Mongo-generated info on success, else null 
 *  if there is no todo with the given objId
 */
async function toggleToDo(objId) {
  const cursor = todos.find({ _id: objId });
  const todo = await cursor.toArray();
  console.log(todo);

  // First, make sure the todo with id actually exists
  if (todo.length !== 1) {
    return null;
  }

  const isCompleted = todo[0].completed;
  const updateDocument = isCompleted ? { $set: { completed: false } } : { $set: { completed: true } };
  return await todos.updateOne({ _id: objId }, updateDocument);
}

/**
 * Deletes the todo matching id
 *
 * @param {ObjectId} objId - MongoDB ObjectId of the existing todo
 * @return {Object} MongoDB document containing Mongo-generated info on success, else null 
 *  if there is no todo with the given objId
 */
async function deleteToDo(objId) {
  const cursor = todos.find({ _id: objId });
  const todo = await cursor.toArray();
  console.log(todo);

  // First, make sure the todo with id actually exists
  if (todo.length !== 1) {
    return null;
  }

  return await todos.deleteOne({ _id: objId });
}

// post: modify database, get: asks for data from database
// Express routes: https://expressjs.com/en/guide/routing.html

// BE CAREFUL WHEN MODIFYING POINTS: IT'S A STRING, NOT A NUMBER (so that # points is searchable in table)

// Handle POST request for creating a new user
app.post("/users/create", async function (req, res) {
  const username = req.query.username;
  const password = req.query.password;
  console.log(`Create user ${username}`);
  const result = await createUser(username, password);
  console.log(result ? "Signup success" : "Signup failed");
  if (result) {
    res.json(result);
  } else {
    console.log("Return error status");
    res.status(400).send();
  }
});

// Handle GET request for logging in
app.get("/users/login", async function (req, res) {
  const username = req.query.username;
  const password = req.query.password;
  console.log(`Log in as user ${username}`);
  const result = await loginUser(username, password);
  console.log(result ? "Login success" : "Login failed");
  result ? res.status(200).send() : res.status(400).send();
});

// Handle GET request for getting a user's points
app.get("/users/points/get", async function (req, res) {
  const username = req.query.username;
  console.log(`Get number of points for user ${username}`);
  const result = await getUserPoints(username);
  if (result) {
    console.log(`${username} has ${result} points`);
    res.send(result);
  } else {
    res.status(400).send();
  }
});

// Handle POST request for changing a user's points (current points + diff)
app.post("/users/points/add", async function (req, res) {
  const username = req.query.username;
  const diff = req.query.diff;
  console.log(`Add ${diff} points for user ${username}`);
  const result = await addUserPoints(username, diff);
  result ? res.status(200).send() : res.status(400).send();
});

// Handle GET request for accessing the count of an item in a user's inventory
app.get("/users/items/get", async function (req, res) {
  const username = req.query.username;
  const item = req.query.item;
  console.log(`Get count of ${item} from user ${username}'s inventory`);
  const result = await getUserItemCount(username, item);
  if (result) {
    console.log(`${username} has ${result} ${item}`);
    res.send(result);
  } else {
    res.status(400).send();
  }
});

// Handle POST request for adding an item to a user's inventory
app.post("/users/items/add", async function (req, res) {
  const username = req.query.username;
  const item = req.query.item;
  console.log(`Add 1 of ${item} to user ${username}'s inventory`);
  const result = await addUserItem(username, item);
  result ? res.status(200).send() : res.status(400).send();
});

// Handle GET request for retrieving leaderboard
app.get("/users/leaderboard", async function (req, res) {
  const cursor = users.find({});
  const allUserData = await cursor.toArray();
  const { query } = req.query;
  const keys = ["username", "points"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => {
        return item[key].toLowerCase().includes(query);
      })
    );
  };

  const comparePoints = (a, b) => {
    if (Number(a.points) > Number(b.points)) {
      return -1;
    } else if (Number(a.points) < Number(b.points)) {
      return 1;
    }
    return 0;
  };

  res.json(search(allUserData).sort(comparePoints));
});

// Handle POST request for inserting a new session
app.post("/sessions/create", async function (req, res) {
  const username = req.query.username;
  const startTime = req.query.startTime;
  const endTime = req.query.endTime;
  const sessionLength = req.query.sessionLength;

  console.log(`Create new session for user ${username}`);
  const result = await createSession(username, startTime, endTime, sessionLength);
  console.log(result ? "Session creation success" : "Session creation failed");
  if (result) {
    console.log(result);
    res.json(result);
  } else {
    res.status(400).send();
  }
});

// Handle GET request for retrieving all session history
app.get("/sessions/history", async function (req, res) {
  const cursor = sessions.find({});
  const allSessionData = await cursor.toArray();
  const { query } = req.query;
  const keys = ["username"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => {
        return item[key].toLowerCase().includes(query);
      })
    );
  };

  res.json(search(allSessionData));
});

// Handle GET request for retrieving all sessions of a specific user
app.get("/sessions/user", async function (req, res) {
  const username = req.query.username;
  console.log(`Get sessions for ${username}`);
  const cursor = sessions.find({ username: username });
  const result = await cursor.toArray();

  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(400).send();
  }
});

// Handle GET request for getting all of a user's todos
app.get("/todos/get", async function (req, res) {
  const username = req.query.username;
  console.log(`Get todos for user ${username}`);

  // Return array of all todos for user
  const cursor = todos.find({ username: username });
  const todo = await cursor.toArray();
  console.log(todo);
  res.json(todo);
});

// Handle POST request for inserting a new session
app.post("/todos/create", async function (req, res) {
  const username = req.query.username;
  const text = req.query.text;
  console.log(`Create new todo for user ${username}`);
  const result = await createToDo(username, text);
  console.log(result ? "Todo creation success" : "Todo creation failed");

  if (result) {
    const cursor = todos.find({ username: username, text: text });
    const todo = await cursor.toArray();
    console.log(todo[0]);
    res.json(todo[0]);
  } else {
    res.status(400).send();
  }
});

// Handle POST request for toggling completion status, given a todo id
app.post("/todos/toggle", async function (req, res) {
  const id = req.query.id;
  console.log(`Toggle completion for todo ${id}`);

  const objId = new ObjectId(id);
  const result = await toggleToDo(objId);
  console.log(result);

  if (result) {
    const cursor = todos.find({ _id: objId });
    const todo = await cursor.toArray();
    console.log(todo[0]);
    res.json(todo[0]);
  } else {
    res.status(400).send();
  }
});

// Handle POST request for deleting a todo, given its id
app.post("/todos/delete", async function (req, res) {
  const id = req.query.id;
  console.log(`Delete todo ${id}`);

  const objId = new ObjectId(id);
  const result = await deleteToDo(objId);
  console.log(result ? "Todo deletion success" : "Todo deletion failed");

  result ? res.status(200).send() : res.status(400).send();
});

// start server; listening at port 5050
app.listen(5050);
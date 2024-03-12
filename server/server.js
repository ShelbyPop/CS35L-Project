import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
const uri =
  "mongodb+srv://Cluster06218:dj9ZW9n0VECoINZe@cluster06218.af6kogl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster06218";
const client = new MongoClient(uri);
const users = client.db("database").collection("users");
const sessions = client.db("database").collection("sessions");
// MongoDB documentation: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const allItems = ["coffee", "cakes", "pies", "donuts", "waffles", "misc"];

// Connect to MongoDB server
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

// Get array of user (users, if we messed up) matching username
async function getUser(username) {
  const cursor = users.find({ username: username });
  const user = await cursor.toArray();
  console.log(user);
  return user;
}

// Given a number of users, checks if numUsers is 1 and prints error messages otherwise
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

// Insert new user into users collection with empty sessions array
async function createUser(username, password) {
  const user = await getUser(username);
  // Return if username already exists
  if (user.length) {
    return;
  }
  return await users.insertOne({
    username: username,
    password: password,
    points: "0",
    coffee: "0",
    cakes: "0",
    pies: "0",
    donuts: "0", 
    waffles: "0", 
    misc: "0"
  });
}

// Validate existence of user with matching password in collection (return boolean)
async function loginUser(username, password) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return null;
  } else if (user.length === 0) {
    console.log("User does not exist");
    return null;
  }
  console.log(`${user[0].password}, ${password}`);
  return (user.length === 1 && user[0].password === password);
}

// Return number of points of user
async function getUserPoints(username) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return null;
  } else if (user.length === 0) {
    console.log("User does not exist");
    return null;
  }
  return (user[0].points);
}

// Add points to user; return true if success and false if user not found
async function addUserPoints(username, diff) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return false;
  } else if (user.length === 0) {
    console.log("User does not exist");
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

// Check how many of a given item a user has
async function getUserItemCount(username, item) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return null;
  } else if (user.length === 0) {
    console.log("User does not exist");
    return null;
  }

  if (allItems.includes(item)) {
    return (user[0][item]);
  }

  console.log(`Invalid item given: ${item}`);
  return null;
}

// Add 1 to the count of item, given a user
async function addUserItem(username, item) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return false;
  } else if (user.length === 0) {
    console.log("User does not exist");
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

// Insert a new session into the sessions collection
async function createSession(username, startTime, endTime, sessionLength) {
  // Only insert session if user is signed in and startTime/endTime is valid
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
    return null;
  } else if (user.length === 0) {
    console.log("User does not exist");
    return null;
  } else if (startTime === null || endTime === null) {
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
    console.log("Return error status");
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

// start server; listening at port 5050
app.listen(5050);
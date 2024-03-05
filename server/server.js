import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
const uri =
  "mongodb+srv://Cluster06218:dj9ZW9n0VECoINZe@cluster06218.af6kogl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster06218";
const client = new MongoClient(uri);
const users = client.db("database").collection("users");
// MongoDB documentation: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

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
  });
}

// Validate existence of user with matching password in collection
async function loginUser(username, password) {
  const user = await getUser(username);
  if (user.length > 1) {
    console.log("Too many users, please fix bug!!");
  }
  console.log(`${user[0].password}, ${password}`);
  return (user.length === 1 && user[0].password === password);
}

// post: modify database, get: asks for data from database
// Express routes: https://expressjs.com/en/guide/routing.html

// BE CAREFUL WHEN MODIFYING POINTS: IT'S A STRING, NOT A NUMBER

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
    console.log("return error status");
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

// Handle GET request for retrieving leaderboard
app.get("/", async function (req, res) {
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

// start server; listening at port 5050
app.listen(5050);
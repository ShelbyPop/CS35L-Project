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

// Insert new user into users collection with empty sessions array
async function createUser(username, password) {
  return await users.insertOne({
    username: username,
    password: password,
    points: "0",
  });
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
  res.json(result);
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
        return item[key].toLowerCase().includes(query.toLowerCase());
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
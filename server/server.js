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

// Insert new user into users collection with empty sessions array
async function createUser(username, password) {
  return await users.insertOne({
    username: username,
    password: password,
    sessions: [],
  });
}

// post: modify database, get: asks for data from database
// Express routes: https://expressjs.com/en/guide/routing.html

// Handle POST request for creating a new user
app.post("/users/create", async function (req, res) {
  const username = req.query.username;
  const password = req.query.password;
  console.log(`Create user ${username}`);
  const result = await createUser(username, password);
  res.json(result);
});

// start server; listening at port 5050
app.listen(5050);
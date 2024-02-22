import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const uri = "mongodb+srv://Cluster06218:dj9ZW9n0VECoINZe@cluster06218.af6kogl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster06218";

const client = new MongoClient(uri);

// post: modify database, get: asks for data from database
// Express route: https://expressjs.com/en/guide/routing.html
app.get('/', function(_req, res) {
    res.send('u are a chubby wubby');
});

// start server; listening at port 3000
app.listen(3000);
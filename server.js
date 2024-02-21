const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Install cors if not already installed
const app = express();
const uri =
'mongodb+srv://virounika:0122559090Wo@pompom.d2oeze8.mongodb.net/?retryWrites=true&w=majority'


async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB");
        } catch (error) 
        {
            console.error(error);
        }
}

connect();

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
  const UserModel = mongoose.model('User', userSchema);
  
  // API endpoint to handle login information
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Save login information to MongoDB
      const newUser = new UserModel({ username, password });
      await newUser.save();
  
      res.status(200).json({ message: 'Login information saved successfully' });
    } catch (error) {
      console.error('Error saving login information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
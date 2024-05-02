const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

// Handle user creation
router.post('/', async (req, res) => {
  try {
    // Create a new user
    const user = new User(req.body);
    await user.save(); // Save the user to the database

    // Write to the database
    const savedUser = await user.save(); // Save the user to the database
    console.log('User saved successfully:', savedUser);
    res.status(201).json({ 
      message: "User saved successfully",
      user: savedUser
    }); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Handle fetching user data
router.get('/', async (req, res) => {
  try {
    // Fetch user data from the database
    const users = await User.find(); 
    res.json({ users });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;

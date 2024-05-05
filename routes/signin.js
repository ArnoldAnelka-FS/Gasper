const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');

// Handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract user data from request body
    const { firstName, lastName, address, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !address || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message and saved user data
    res.status(201).json({ 
      message: "User created successfully",
      user: newUser
    }); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;

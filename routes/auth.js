const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role: 'user' });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, 'secretKey');
    res.header('Authorization', token).json({ token });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

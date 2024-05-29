const express = require('express');
const jwt = require('jsonwebtoken');
const CoffeeItem = require('../models/coffeeItem');

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'secretKey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Get items in cart
router.get('/', authenticateToken, (req, res) => {
  // This is a placeholder; you'll need to implement cart functionality
  res.status(200).send('Get cart items');
});

// Add item to cart
router.post('/:id', authenticateToken, async (req, res) => {
  const coffeeItem = await CoffeeItem.findById(req.params.id);
  // This is a placeholder; you'll need to implement cart functionality
  res.status(201).send(`Added ${coffeeItem.name} to cart`);
});

module.exports = router;

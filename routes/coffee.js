const express = require('express');
const CoffeeItem = require('../models/coffeeItem');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'secretKey');
    if (verified.role !== 'admin') return res.status(403).send('Admin access required');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Create a coffee item (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  const coffeeItem = new CoffeeItem({ name, description, price, image });
  await coffeeItem.save();
  res.status(201).send('Coffee item created');
});

// Get all coffee items
router.get('/', async (req, res) => {
  const coffeeItems = await CoffeeItem.find();
  res.status(200).json(coffeeItems);
});

// Get a specific coffee item
router.get('/:id', async (req, res) => {
  const coffeeItem = await CoffeeItem.findById(req.params.id);
  res.status(200).json(coffeeItem);
});

// Update a coffee item (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  await CoffeeItem.findByIdAndUpdate(req.params.id, { name, description, price, image });
  res.status(200).send('Coffee item updated');
});

// Delete a coffee item (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  await CoffeeItem.findByIdAndDelete(req.params.id);
  res.status(200).send('Coffee item deleted');
});

module.exports = router;

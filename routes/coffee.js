const express = require('express');
const CoffeeItem = require('../models/coffeeItem');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify admin
// const verifyAdmin = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });
//   try {
//     const verified = jwt.verify(token, 'secretKey');
//     if (verified.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };

// Create a coffee item (admin only)
router.post('/', async (req, res) => {
  const { name, description, price, image } = req.body;
  const coffeeItem = new CoffeeItem({ name, description, price, image });
  await coffeeItem.save();
  res.status(201).json({ message: 'Coffee item created' });
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
router.put('/:id', async (req, res) => {
  const { name, description, price, image } = req.body;
  await CoffeeItem.findByIdAndUpdate(req.params.id, { name, description, price, image });
  res.status(200).json({ message: 'Coffee item updated' });
});

// Delete a coffee item (admin only)
router.delete('/:id', async (req, res) => {
  await CoffeeItem.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Coffee item deleted' });
});

module.exports = router;

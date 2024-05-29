const mongoose = require('mongoose');

const coffeeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const CoffeeItem = mongoose.model('CoffeeItem', coffeeItemSchema);
module.exports = CoffeeItem;

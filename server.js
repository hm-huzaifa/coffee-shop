const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const coffeeRoutes = require('./routes/coffee');
const cartRoutes = require('./routes/cart');
const cors = require('cors'); 


const app = express();
mongoose.connect('mongodb://localhost:27017/coffeeshop', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/auth', authRoutes);
app.use('/coffee', coffeeRoutes);
app.use('/cart', cartRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const coffeeRoutes = require('./routes/coffee');
const cartRoutes = require('./routes/cart');

const app = express();
mongoose.connect('mongodb://localhost:27017/coffeeshop', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/auth', authRoutes);
app.use('/coffee', coffeeRoutes);
app.use('/cart', cartRoutes);

// Redirect root to the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

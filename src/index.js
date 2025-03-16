// src/index.js
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const config = require('../psql/config/database'); // Adjust path if needed
const userRoutes = require('./routes/userRoutes');

const app = express();

// Initialize Sequelize with the development config
const sequelize = new Sequelize(config.development);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Mount User routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    // Uncomment to sync models (development only)
    // return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
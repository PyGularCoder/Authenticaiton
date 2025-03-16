// src/index.js
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize'); // Import Sequelize constructor
const config = require('../psql/config/database'); // Import config object
// const userRoutes = require('./routes/userRoutes');

// Initialize Sequelize with the development config
const sequelize = new Sequelize(config.development);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount User routes (uncomment when ready)
// app.use('/api/users', userRoutes);

// Port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    // Optional: Sync models (use with caution in production)
    // return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
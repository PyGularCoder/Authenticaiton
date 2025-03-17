// src/index.js
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const config = require('../psql/config/database'); // Adjust path if needed
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')
const app = express();

// Initialize Sequelize with the development config
const sequelize = new Sequelize(config.development);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
// Mount User routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 3000;

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
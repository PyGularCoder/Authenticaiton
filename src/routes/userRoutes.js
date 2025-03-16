'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD Routes
router.post('/createUser', userController.createUser);          // Create
router.get('/getAllUsers', userController.getAllUsers);          // Read all
router.get('/getUser', userController.getUser);          // Read one
router.put('/updateUser', userController.updateUser);       // Update
router.delete('/deleteUser', userController.deleteUser);    // Delete

module.exports = router;
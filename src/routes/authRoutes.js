'use strict';

const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', AuthController.login);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/refresh-token', AuthController.refreshToken);

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed', userId: req.user.id });
});

module.exports = router;
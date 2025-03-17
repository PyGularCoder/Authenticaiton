'use strict';

const AuthService = require('../services/authService');

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const tokens = await AuthService.login(email, password);
      res.status(200).json({
        message: 'Login successful, please verify OTP',
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyOTP(req, res, next) {
    try {
      const { otp, preauth } = req.body;
      if (!otp || !preauth) {
        return res.status(400).json({ message: 'OTP and Preauth token are required' });
      }

      const tokens = await AuthService.verifyOTP(otp, preauth);
      res.status(200).json({
        message: 'OTP verified, tokens issued',
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refresh } = req.body;
      if (!refresh) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      const tokens = await AuthService.refreshToken(refresh);
      res.status(200).json({
        message: 'Token refreshed',
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
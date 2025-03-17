'use strict';

const { User, Password, AccessTokens, TokenType } = require('../models');
const crypto = require('crypto');

class AuthService {
  // Generate OTP (simplified for demo; in production, send via email/SMS)
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

  // Login with email and password
  static async login(email, password) {
    const user = await User.findOne({ where: { email }, include: 'passwordInfo' });
    if (!user) throw new Error('User not found');

    const pwd = user.passwordInfo;
    const hashedInput = Password.hashPassword(password, pwd.salt, pwd.pepper);
    if (hashedInput !== pwd.hashedPassword) throw new Error('Invalid password');

    // Generate OTP and Preauth Token
    const otp = this.generateOTP();
    const otpToken = await AccessTokens.create({
      userId: user.id,
      token: otp,
      tokenTypeId: (await TokenType.findOne({ where: { type: 'OTP_TOKEN' } })).id,
      expiresAt: AccessTokens.getExpiryDate('OTP_TOKEN'),
    });

    const preauthToken = await AccessTokens.create({
      userId: user.id,
      token: AccessTokens.generateToken(),
      tokenTypeId: (await TokenType.findOne({ where: { type: 'PREAUTH' } })).id,
      expiresAt: AccessTokens.getExpiryDate('PREAUTH'),
    });

    return { otp: otpToken.token, preauth: preauthToken.token };
  }

  // Verify OTP and issue PAT/Refresh tokens
  static async verifyOTP(otp, preauth) {
    const otpRecord = await AccessTokens.findOne({ where: { token: otp } });
    const preauthRecord = await AccessTokens.findOne({ where: { token: preauth } });

    if (!otpRecord || !preauthRecord || otpRecord.userId !== preauthRecord.userId) {
      throw new Error('Invalid OTP or Preauth token');
    }

    const now = new Date();
    if (now > otpRecord.expiresAt || now > preauthRecord.expiresAt) {
      throw new Error('Token expired');
    }

    const userId = otpRecord.userId;

    // Generate PAT and Refresh Token
    const pat = await AccessTokens.create({
      userId,
      token: AccessTokens.generateToken(),
      tokenTypeId: (await TokenType.findOne({ where: { type: 'PAT' } })).id,
      expiresAt: AccessTokens.getExpiryDate('PAT'),
    });

    const refresh = await AccessTokens.create({
      userId,
      token: AccessTokens.generateToken(),
      tokenTypeId: (await TokenType.findOne({ where: { type: 'REFRESH' } })).id,
      expiresAt: AccessTokens.getExpiryDate('REFRESH'),
    });

    // Clean up used tokens
    await otpRecord.destroy();
    await preauthRecord.destroy();

    return { pat: pat.token, refresh: refresh.token };
  }

  // Refresh PAT using Refresh Token
  static async refreshToken(refreshToken) {
    const refreshRecord = await AccessTokens.findOne({
      where: { token: refreshToken },
      include: 'tokenType',
    });

    if (!refreshRecord || refreshRecord.tokenType.type !== 'REFRESH') {
      throw new Error('Invalid refresh token');
    }

    if (new Date() > refreshRecord.expiresAt) {
      throw new Error('Refresh token expired');
    }

    // Generate new PAT
    const pat = await AccessTokens.create({
      userId: refreshRecord.userId,
      token: AccessTokens.generateToken(),
      tokenTypeId: (await TokenType.findOne({ where: { type: 'PAT' } })).id,
      expiresAt: AccessTokens.getExpiryDate('PAT'),
    });

    return { pat: pat.token };
  }
}

module.exports = AuthService;
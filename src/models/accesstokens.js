'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class AccessTokens extends Model {
    static associate(models) {
      AccessTokens.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      AccessTokens.belongsTo(models.TokenType, {
        foreignKey: 'tokenTypeId',
        as: 'tokenType'
      });
    }

    // Generate a secure token
    static generateToken(length = 32) {
      return crypto.randomBytes(length).toString('hex');
    }

    // Set expiry time based on token type
    static getExpiryDate(tokenType) {
      const now = new Date();
      let expirySeconds;

      switch (tokenType) {
        case 'OTP_TOKEN':
          expirySeconds = parseInt(process.env.OTP_TOKEN_EXPIRY, 10);
          break;
        case 'PREAUTH':
          expirySeconds = parseInt(process.env.PREAUTH_TOKEN_EXPIRY, 10);
          break;
        case 'PAT':
          expirySeconds = parseInt(process.env.PAT_EXPIRY, 10);
          break;
        case 'REFRESH':
          expirySeconds = parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10);
          break;
        case 'CLIO_TOKEN':
          expirySeconds = parseInt(process.env.CLIO_TOKEN_EXPIRY, 10);
          break;
        default:
          expirySeconds = 3600; // Default 1 hour
      }

      return new Date(now.getTime() + expirySeconds * 1000);
    }
  }

  AccessTokens.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tokenTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TokenTypes',
        key: 'id'
      }
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AccessTokens',
    indexes: [
      { fields: ['token'] }, // Index for fast token lookups
      { fields: ['userId', 'tokenTypeId'] } // Index for user-specific token queries
    ]
  });

  return AccessTokens;
};
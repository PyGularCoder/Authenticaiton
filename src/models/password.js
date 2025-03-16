'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class Password extends Model {
    static associate(models) {
      Password.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }

    // Method to generate salt
    static generateSalt() {
      return crypto.randomBytes(16).toString('hex');
    }

    // Method to generate pepper
    static generatePepper() {
      return crypto.randomBytes(8).toString('hex');
    }

    // Method to hash password
    static hashPassword(password, salt, pepper) {
      return crypto.pbkdf2Sync(
        password + pepper,
        salt,
        100000, // iterations
        64,     // key length
        'sha512'
      ).toString('hex');
    }
  }

  Password.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pepper: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Password',
  });

  return Password;
};
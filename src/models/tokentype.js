'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TokenType extends Model {
    static associate(models) {
      TokenType.hasMany(models.AccessTokens, {
        foreignKey: 'tokenTypeId',
        as: 'accessTokens'
      });
    }
  }

  TokenType.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'TokenType',
  });

  return TokenType;
};
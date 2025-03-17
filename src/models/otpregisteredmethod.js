'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OTPRegisteredMethod extends Model {
    static associate(models) {
      // Many-to-one relationship with User
      OTPRegisteredMethod.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Many-to-one relationship with OTPMethodType
      OTPRegisteredMethod.belongsTo(models.OTPMethodType, {
        foreignKey: 'otpMethodTypeId',
        as: 'otpMethodType'
      });
    }
  }

  OTPRegisteredMethod.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    otpMethodTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OTPMethodTypes',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false // e.g., "example@email.com" for EMAIL, "+1234567890" for SMS
    }
  }, {
    sequelize,
    modelName: 'OTPRegisteredMethod',
  });

  return OTPRegisteredMethod;
};
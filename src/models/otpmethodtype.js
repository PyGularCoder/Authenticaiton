'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OTPMethodType extends Model {
    static associate(models) {
      // One-to-many relationship with OTPRegisteredMethod
      OTPMethodType.hasMany(models.OTPRegisteredMethod, {
        foreignKey: 'otpMethodTypeId',
        as: 'registeredMethods'
      });
    }
  }

  OTPMethodType.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OTPMethodType',
  });

  return OTPMethodType;
};
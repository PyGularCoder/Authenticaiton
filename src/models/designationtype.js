'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DesignationType extends Model {
    static associate(models) {
      // One-to-many relationship with User
      DesignationType.hasMany(models.User, {
        foreignKey: 'designationTypeId',
        as: 'users'
      });
    }
  }

  DesignationType.init({
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DesignationType',
  });

  return DesignationType;
};
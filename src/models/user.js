'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Password, {
        foreignKey: 'userId',
        as: 'passwordInfo'
      });

      User.belongsToMany(models.WorkflowActions, {
        through: 'UserWorkflowActions',
        foreignKey: 'userId',
        otherKey: 'workflowActionId',
        as: 'workflowActions'
      });

      User.belongsTo(models.DesignationType, {
        foreignKey: 'designationTypeId',
        as: 'designation'
      });

      User.hasMany(models.OTPRegisteredMethod, {
        foreignKey: 'userId',
        as: 'otpRegisteredMethods'
      });

      // One-to-many relationship with AccessTokens
      User.hasMany(models.AccessTokens, {
        foreignKey: 'userId',
        as: 'accessTokens'
      });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    designationTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DesignationTypes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
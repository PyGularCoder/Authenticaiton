'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkflowActions extends Model {
    static associate(models) {
      // Many-to-many relationship with User through UserWorkflowActions
      WorkflowActions.belongsToMany(models.User, {
        through: 'UserWorkflowActions',
        foreignKey: 'workflowActionId',
        otherKey: 'userId',
        as: 'users'
      });
    }
  }

  WorkflowActions.init({
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
    modelName: 'WorkflowActions',
  });

  return WorkflowActions;
};
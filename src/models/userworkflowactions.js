'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWorkflowActions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWorkflowActions.init({
    userId: DataTypes.INTEGER,
    workflowActionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWorkflowActions',
  });
  return UserWorkflowActions;
};
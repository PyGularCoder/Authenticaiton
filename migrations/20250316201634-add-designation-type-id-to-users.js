'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'designationTypeId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Change to false if designation is required
      references: {
        model: 'DesignationTypes',
        key: 'id'
      },
      onDelete: 'SET NULL', // Or 'CASCADE' depending on your preference
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'designationTypeId');
  }
};
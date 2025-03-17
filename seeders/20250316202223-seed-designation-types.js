'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DesignationTypes', [
      {
        label: 'Employee',
        value: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        label: 'Manager',
        value: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        label: 'Admin',
        value: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DesignationTypes', null, {});
  }
};
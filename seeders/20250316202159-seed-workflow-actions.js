'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('WorkflowActions', [
      {
        label: 'Submit Form',
        value: 'submit_form',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        label: 'Update Form',
        value: 'update_form',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        label: 'Approve Form',
        value: 'approve_form',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WorkflowActions', null, {});
  }
};
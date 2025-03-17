'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OTPMethodTypes', [
      { type: 'EMAIL', createdAt: new Date(), updatedAt: new Date() },
      { type: 'SMS', createdAt: new Date(), updatedAt: new Date() },
      { type: 'TOTP', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OTPMethodTypes', null, {});
  }
};
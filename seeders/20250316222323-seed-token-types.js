'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TokenTypes', [
      { type: 'OTP_TOKEN', createdAt: new Date(), updatedAt: new Date() },
      { type: 'PREAUTH', createdAt: new Date(), updatedAt: new Date() },
      { type: 'PAT', createdAt: new Date(), updatedAt: new Date() },
      { type: 'REFRESH', createdAt: new Date(), updatedAt: new Date() },
      { type: 'CLIO_TOKEN', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TokenTypes', null, {});
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OTPRegisteredMethods', [
      {
        userId: 1,
        otpMethodTypeId: 1, // EMAIL
        value: 'example@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        otpMethodTypeId: 2, // SMS
        value: '+1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OTPRegisteredMethods', null, {});
  }
};
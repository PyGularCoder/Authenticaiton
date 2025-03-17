'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tokenTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TokenTypes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes
    await queryInterface.addIndex('AccessTokens', ['token']);
    await queryInterface.addIndex('AccessTokens', ['userId', 'tokenTypeId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessTokens');
  }
};
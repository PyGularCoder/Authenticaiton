'use strict';
const { User, Password } = require('../models');
const crypto = require('crypto');

class UserService {
  static async createUser(data) {
    return User.sequelize.transaction(async (t) => {
      const { firstName, lastName, email, password } = data;
      console.log('data: ', data)
      const user = await User.create({
        firstName,
        lastName,
        email
      }, { transaction: t });

      const salt = Password.generateSalt();
      const pepper = Password.generatePepper();
      const hashedPassword = Password.hashPassword(password, salt, pepper);

      await Password.create({
        userId: user.id,
        hashedPassword,
        salt,
        pepper
      }, { transaction: t });

      return user;
    });
  }

  static async getAllUsers() {
    return User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email']
    });
  }

  static async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: [{
        model: Password,
        as: 'passwordInfo',
        attributes: ['id'] // We don't want to return sensitive data
      }]
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  static async updateUser(id, data) {
    return User.sequelize.transaction(async (t) => {
      const user = await User.findByPk(id, { transaction: t });
      if (!user) throw new Error('User not found');

      const updateData = {};
      if (data.firstName) updateData.firstName = data.firstName;
      if (data.lastName) updateData.lastName = data.lastName;
      if (data.email) updateData.email = data.email;

      await user.update(updateData, { transaction: t });

      if (data.password) {
        const passwordRecord = await Password.findOne({ 
          where: { userId: id },
          transaction: t 
        });
        
        const salt = Password.generateSalt();
        const pepper = Password.generatePepper();
        const hashedPassword = Password.hashPassword(data.password, salt, pepper);

        await passwordRecord.update({
          hashedPassword,
          salt,
          pepper
        }, { transaction: t });
      }

      return user;
    });
  }

  static async deleteUser(id) {
    return User.sequelize.transaction(async (t) => {
      const user = await User.findByPk(id, { transaction: t });
      if (!user) throw new Error('User not found');
      
      await user.destroy({ transaction: t });
      return { message: 'User deleted successfully' };
    });
  }
}

module.exports = UserService;
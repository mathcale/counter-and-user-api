const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const { DynamoDB } = require('../infra');

const { USERS_TABLE_NAME } = process.env;

module.exports = {
  createUser: async (userData) => {
    try {
      const user = {
        ...userData,
        pk: `EMAIL#${userData.email}`,
        id: uuid(),
        password: bcrypt.hashSync(userData.password),
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await DynamoDB.putItem(USERS_TABLE_NAME, user);
      delete user.password;

      return user;
    } catch (err) {
      throw err.name === 'ConditionalCheckFailedException'
        ? new Error('Email already in use')
        : err;
    }
  },
};

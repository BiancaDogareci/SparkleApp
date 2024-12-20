'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockUsers = new Array(100).fill().map(() => {
      return {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Users', mockUsers, {});
  },

  async down(queryInterface, Sequelize) {
    // Rollback the seeded data
    await queryInterface.bulkDelete('Users', null, {});
  }
};

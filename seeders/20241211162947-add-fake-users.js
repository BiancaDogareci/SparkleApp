'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockUsers = new Array(100).fill().map(() => {
      return {
        name: faker.internet.username(),
        password: faker.internet.password(),
        username:faker.internet.username(),
        email:faker.internet.email(),
        createdAt: Date(),
        updatedAt: Date(),
      }
    });

    await queryInterface.bulkInsert('Users', mockUsers, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

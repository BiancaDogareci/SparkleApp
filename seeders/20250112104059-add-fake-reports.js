'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reports = new Array(10).fill().map(() => {
      return {
        userId: 1,
        postId: 1,
        reason: faker.word.adjective(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await queryInterface.bulkInsert('Reports', reports, {});
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

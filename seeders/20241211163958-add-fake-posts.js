'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockPosts = new Array(100).fill().map(() => {
      return {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        edited: faker.datatype.boolean(),
        userId: faker.number.int({ min: 1, max: 100 }),  // Use faker.number.int() instead of faker.datatype.number()
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Posts', mockPosts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};

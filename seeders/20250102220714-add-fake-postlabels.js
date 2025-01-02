'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakePostLabels = Array.from({ length: 10 }, () => ({
      postId: faker.number.int({ min: 1, max: 50 }),
      labelId: faker.number.int({ min: 1, max: 10 })
    }));

    await queryInterface.bulkInsert('PostLabels', fakePostLabels, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostLabels', null, {});
  }
};

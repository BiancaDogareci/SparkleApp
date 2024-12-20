'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const labels = new Array(100).fill().map(()=>{
          return {
            name: faker.book.genre(),
            usage: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
      });

      await queryInterface.bulkInsert('Labels', labels, {});
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

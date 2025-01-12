'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakePostLabels = Array.from({ length: 25 }, () => ({
      postId: faker.number.int({ min: 1, max: 50 }),
      labelId: faker.number.int({ min: 1, max: 25 })
    }));

    await queryInterface.bulkInsert('PostLabels', fakePostLabels, {});

    //actualizam usage count
    await queryInterface.sequelize.query(`
      UPDATE "Labels" 
      SET usage = (
        SELECT COUNT(*) 
        FROM "PostLabels" 
        WHERE "PostLabels"."labelId" = "Labels".id
      )
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostLabels', null, {});
    
    await queryInterface.bulkUpdate('Labels', { usage: 0 }, {});
  }
};
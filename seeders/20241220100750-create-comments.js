'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const comments = [];
    const numComments = 50; 

    for (let i = 0; i < numComments; i++) {
      comments.push({
        body: faker.lorem.sentence(), 
        userId: faker.number.int({ min: 1, max: 100 }), 
        postId: faker.number.int({ min: 1, max: 30 }), 
        edited: faker.datatype.boolean(),
        createdAt: new Date(), 
        updatedAt: new Date(),
      });
    }

    
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Comments', null, {});
  },
};

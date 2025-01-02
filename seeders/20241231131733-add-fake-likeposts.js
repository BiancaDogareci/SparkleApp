'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const likes = [];

    for (let i = 1; i <= 5; i++) {
      likes.push({
        userId: 1,
        postId: i,
        givenAt: new Date()
      });
    }

    await queryInterface.bulkInsert('LikePosts', likes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LikePosts', null, {});
  }
};

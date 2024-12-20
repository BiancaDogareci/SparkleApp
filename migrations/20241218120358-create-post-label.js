'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostLabels', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Posts',
          },
          key: 'id',
        }
      },
      labelId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Labels',
          },
          key: 'id',
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostLabels');
  }
};
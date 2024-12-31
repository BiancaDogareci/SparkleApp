'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LikePosts', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      givenAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Primary key compusa
    await queryInterface.addConstraint('LikePosts', {
      fields: ['userId', 'postId'],
      type: 'primary key',
      name: 'likeposts_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LikePosts');
  },
};

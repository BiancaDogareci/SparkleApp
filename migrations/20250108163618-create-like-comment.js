'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LikeComments', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Comments',
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
    await queryInterface.addConstraint('LikeComments', {
      fields: ['userId', 'commentId'],
      type: 'primary key',
      name: 'likecomments_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LikeComments');
  },
};

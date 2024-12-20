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
          key: 'postId', // Match the foreign key in the Post model
        },
        onDelete: 'CASCADE', // Remove associations if the post is deleted
        primaryKey: true, // Composite primary key: this + labelId
        field: 'postId', // Map this column to Sequelize's expected name
      },
      labelId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Labels',
          },
          key: 'labelId', // Match the foreign key in the Label model
        },
        onDelete: 'CASCADE', // Remove associations if the label is deleted
        primaryKey: true, // Composite primary key
        field: 'labelId', // Map this column to Sequelize's expected name
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostLabels');
  }
};

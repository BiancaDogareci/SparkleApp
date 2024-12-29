'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id', 
        },
        onDelete: 'CASCADE', 
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      parentCommentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      edited: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,  
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};

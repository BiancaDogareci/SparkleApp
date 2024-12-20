'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {  // Renamed 'id' to 'postId' to match the model
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Correct table name for 'Users' model
          key: 'userId',  // References 'userId' in the Users table
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,  // Changed to true based on model definition
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,  // Changed to match the model
      },
      edited: {
        type: Sequelize.BOOLEAN,  // Changed to BOOLEAN based on model
        allowNull: false,
        defaultValue: false,  // Default value for 'edited'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Ensures default timestamp
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Ensures default timestamp
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};

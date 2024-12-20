'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Labels', {
      labelId: {  // Renamed 'id' to 'labelId' to match the model
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,  // Set to true since it's not explicitly required in the model
      },
      usage: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Set to true based on the model definition
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Default timestamp for createdAt
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Default timestamp for updatedAt
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Labels');
  }
};

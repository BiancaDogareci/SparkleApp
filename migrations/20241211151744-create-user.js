'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {  // Change from 'id' to 'userId'
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {  // New field userName
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {  // New field email with a unique constraint
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {  // New field firstName
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {  // New field lastName
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {  // Field password
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const profiles = [];

    for (let i = 1; i <= 100; i++) { // 100 de profiles pt cei 100 users
      profiles.push({
        userId: i,
        profilePhoto: faker.image.avatar(),
        bio: faker.person.bio(),
        website: faker.internet.url(),
        publicEmail: faker.internet.email(),
        language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
        themePreference: faker.helpers.arrayElement(['light', 'dark']),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Profiles', profiles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};

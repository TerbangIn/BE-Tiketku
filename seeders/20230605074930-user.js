'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const { v4: uuidv4 } = require('uuid');
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        first_name: 'Fadhlan',
        email: 'fadhlan@gmail.com',
        password: '$2b$10$v1BBU3ligvQbQGjBaCYhsuLiqk0QU9elvcDQx.XIfsPle/FkDE4Ce',
        phone_number: '08636721232',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        first_name: 'Fadhlan',
        email: 'fadhlan@gmail.com',
        password: '$2b$10$v1BBU3ligvQbQGjBaCYhsuLiqk0QU9elvcDQx.XIfsPle/FkDE4Ce',
        phone_number: '08636721232',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        first_name: 'Fadhlan E',
        email: 'fadhlana@gmail.com',
        password: '$2b$10$v1BBU3ligvQbQGjBaCYhsuLiqk0QU9elvcDQx.XIfsPle/FkDE4Ce',
        phone_number: '08636721232',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};

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

    await queryInterface.bulkInsert('users', [
      {
        name: 'Fadhlan',
        email: 'fadhlan@gmail.com',
        password: '$2b$10$v1BBU3ligvQbQGjBaCYhsuLiqk0QU9elvcDQx.XIfsPle/FkDE4Ce',
        no_telp: '08636721232',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zeqeelaq',
        email: 'zeqeela@gmail.com',
        password: '$2b$10$TVQDyNqsWnENO0tDPCOXoe6OygwAZPYU9IM.JSSc6LaI2VikauwAS',
        no_telp: '087367261732',
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '$2b$10$wX4QHyBhTBcrkNM0MpUdTOH/XQGgADV31KyI6bdloWd1Ay00U49/y',
        no_telp: '08878738243',
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
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

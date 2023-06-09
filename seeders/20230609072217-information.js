'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('information_flights', [
      {
        flight_id: 1,
        name: "Bagasi 2Kg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flight_id: 1,
        name: "Free Wifi",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flight_id: 1,
        name: "Dessert Box",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flight_id: 1,
        name: "Dapet Selimut",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flight_id: 2,
        name: "Free Bar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flight_id: 2,
        name: "Gratis Ciki",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('information_flights', null, {});
  }
};

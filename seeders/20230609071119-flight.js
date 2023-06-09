'use strict';

const { randFlightDetails } = require('@ngneat/falso');

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
    const dummy = randFlightDetails({length: 10});
    Promise.all(
      dummy.map(async (data) => {
        await queryInterface.bulkInsert('flights', [{
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/AdamAir_logo.png',
          flight_number: data.flightNumber,
          airline: data.airline,
          source_airport: 1,
          destination_airport: 2,
          departure_date: new Date(),
          arrival_date: new Date(),
          capacity: Math.floor(Math.random() * 100),
          economy_class_price: Math.floor(Math.random() * 9999999),
          adult_price_percentage: 100,
          child_price_percentage: 60,
          baby_price_percentage: 0,
          seat_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      })
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('flights', null, {});
  }
};

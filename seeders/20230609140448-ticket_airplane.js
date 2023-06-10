'use strict';
const { v4: uuidv4 } = require('uuid');
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
    let typeClass = ['Economy Class','Business Class','First Class','Premium Class']
    let typePassenger = ["Adult","Child","Baby"]
    await queryInterface.bulkInsert('tiket_airplanes', [
      {
        id: uuidv4(),
        seat_id: 1,
        flight_id : 1,
        max_kg : Math.floor(Math.random() * 20),
        type_of_class: typeClass[Math.floor(Math.random() * typeClass.length)],
        type_of_passenger: typePassenger[Math.floor(Math.random() * typePassenger.length)],
        price : Math.floor(1000000000 + Math.random() * 9000000000),
        passenger_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tiket_airplanes', null, {});
  }
};

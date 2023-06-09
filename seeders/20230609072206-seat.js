'use strict';
const { randSeatNumber } = require('@ngneat/falso');
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
    // const { v4: uuidv4 } = require('uuid');
    const dummy = randSeatNumber({length: 10});
    Promise.all(
      dummy.map(async (data) => {
        await queryInterface.bulkInsert('seats', [{
          seat_number: data,
          status: "Available",
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
    await queryInterface.bulkDelete('seats', null, {});
  }
};

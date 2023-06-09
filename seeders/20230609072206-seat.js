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
    const dummy = []
    for (let i = 0; i < 15;i++){
      for (let j = 1; j <= 6;j++){
        let result = `${(i+10).toString(36).toUpperCase()}${j}`
        dummy.push(result)
      }
    }

    for (let i = 1; i <= 7; i++){
      Promise.all(
        dummy.map(async (data) => {
          await queryInterface.bulkInsert('seats', [{
            seat_number: data,
            flight_id: i,
            status: "Available",
            createdAt: new Date(),
            updatedAt: new Date()
          }], {});
        })
      )
    }
      
    
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

'use strict';
const { randFlightDetails } = require('@ngneat/falso');
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
   let dummy = randFlightDetails({length: 10})
   let randomTitle = ["Tn.","Mr.","Mrs."]
  
    Promise.all(
      dummy.map(async (data) => {
        await queryInterface.bulkInsert('passengers', [{
          title: randomTitle[Math.floor(Math.random() * randomTitle.length)],
          first_name: data.passenger,
          date_of_birth: new Date(Math.floor(Math.random() * (2023 - 1950 + 1)) + 1950,Math.floor(Math.random() * 12),Math.floor(Math.random() * 28) + 1),
          country: data.origin.country,
          identity_number: Math.floor(1000000000 + Math.random() * 9000000000),
          identity_number_of_country: data.destination.country,
          expired_date: new Date(2025,10,10),
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
    await queryInterface.bulkDelete('passengers', null, {});
  }
};

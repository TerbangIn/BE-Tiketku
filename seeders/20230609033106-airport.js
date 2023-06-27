'use strict';

const { randAirport } = require('@ngneat/falso');

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
 
 
    await queryInterface.bulkInsert('airports', [{
         name: "Bandar Udara Internasional Soekarno–Hatta",
         code: "CGK",
         city: "Banten",
         country: "Indonesia",
         continent: "Asia",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        name: "Bandar Udara Internasional Ngurah Rai",
        code: "DPS",
        city: "Denpasar",
        country: "Indonesia",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bandar Udara Internasional Juanda",
        code: "SUB",
        city: "Surabaya",
        country: "Indonesia",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bandar Udara Internasional Sultan Hasanuddin",
        code: "UPG",
        city: "Makassar",
        country: "Indonesia",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bandar Udara Internasional Kualanamu",
        code: "KNO",
        city: "Medan",
        country: "Indonesia",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bandar Udara Halim Perdanakusuma",
        code: "HLP",
        city: "Jakarta",
        country: "Indonesia",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Seoul Incheon International",
        code: "ICN",
        city: "Seoul",
        country: "South Korea",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hong Kong International Airport",
        code: "HKG",
        city: "Hong Kong",
        country: "China",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bandar Udara Changi Singapura",
        code: "SIN",
        city: "Singapore",
        country: "Singapore",
        continent: "Asia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Munich International Airport",
        code: "MUC",
        city: "Munich",
        country: "Germany",
        continent: "Europe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        name: "Madrid Barajas Airport",
        code: "MAD",
        city: "Madrid",
        country: "Spain",
        continent: "Europe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Amsterdam Airport",
        code: "AMS",
        city: "Amsterdam",
        country: "Netherlands",
        continent: "Europe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cape Town Airport",
        code: "CPT",
        city: "Cape Town",
        country: "South Africa",
        continent: "Africa",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "Kairo Internasional Airport",
        code: "CAI",
        city: "Kairo",
        country: "Mesir",
        continent: "Africa",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hartsfield–Jackson Atlanta International Airport",
        code: "ATL",
        city: "Atlanta",
        country: "USA",
        continent: "America",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Los Angeles International Airport",
        code: "LAX",
        city: "Los Angeles",
        country: "USA",
        continent: "America",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "John F. Kennedy International Airport",
        code: "JFK",
        city: "New York",
        country: "USA",
        continent: "America",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Miami International Airport",
        code: "MIA",
        city: "Miami",
        country: "USA",
        continent: "America",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],);
  },
     
    

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('airports', null, {});
  }
};

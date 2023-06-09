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
    
    const { v4: uuidv4 } = require('uuid');
    let dummy = randAirport({length: 10})
    // let dummy1 = randAirport({length: 1})
    // await queryInterface.bulkInsert('airports', [{
    //   id: uuidv4(),
    //   name: dummy1[0].name,
    //   code: dummy1[0].code,
    //   city: dummy1[0].city,
    //   country: dummy1[0].country,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }],);
    
    await Promise.all(
      dummy.map(async (data) => {
        await queryInterface.bulkInsert('airports', [{
         name: data.name,
         code: data.code,
         city: data.city,
         country: data.country,
         createdAt: new Date(),
         updatedAt: new Date()
       }],);
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
    await queryInterface.bulkDelete('airports', null, {});
  }
};

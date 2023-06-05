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
        password: 'fadhlan',
        no_telp: '08636721232',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zeqeelaq',
        email: 'zeqeela@gmail.com',
        password: 'zeqeela',
        no_telp: '087367261732',
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alex',
        email: 'alex@gmail.com',
        password: 'alex',
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

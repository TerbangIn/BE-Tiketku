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

    await queryInterface.bulkInsert('users',[
      {
        name: 'zeqeela',
        email: 'alex@gmail.com',
        password: 'aiuaa',
        no_telp: '092138325283',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'zeqeelaq',
        email: 'alex@gmail.com',
        password: 'aiuaa',
        no_telp: '092138325283',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'zeqeelaw',
        email: 'alex@gmail.com',
        password: 'aiuaa',
        no_telp: '092138325283',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};

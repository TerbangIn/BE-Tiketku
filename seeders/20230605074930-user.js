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
    const { v4: uuidv4 } = require('uuid');
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Saya Admin',
        email: 'sayaadmin@gmail.com',
        password: '$2b$10$Qe5wvk8nnm7RHVuDTP152uRbEO1qZDHGSnC082ArCXxp2RH4.DOiC',
        phone_number: '08123456789',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Saya User',
        email: 'sayauser@gmail.com',
        password: '$2b$10$A.QAZVOlE2hfaKjBAtdbd.RGiG16.xk5NR4DYjfwYW7P6peGp8q8y',
        phone_number: '088888888888',
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
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

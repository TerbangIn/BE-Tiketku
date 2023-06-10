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

    await queryInterface.bulkInsert('notifications', [
      {
        tag: "Notifikasi",
        title: "Transaksimu belum dibayar",
        desc: "Segera lakukan pembayaran pada transaksi anda.",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: "Notifikasi",
        title: "Pembayaranmu sudah terverifikasi",
        desc: "Pembayaranmu sudah kami terima, silahkan check email anda untuk melihat tiket.",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: "Promosi",
        title: "Ada voucher 50% nih buat kamu",
        desc: "Yuk, pakai vouchernya dan pesan tiket kemanapun.",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: "Promosi",
        title: "Ada voucher 50% nih buat kamu",
        desc: "Yuk, pakai vouchernya dan pesan tiket kemanapun.",
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('notifications', null, {});
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_booking:{
        type: Sequelize.STRING,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(['Unpaid','Issued','Cancelled']),
        defaultValue: 'Unpaid'
      },
      total_price: {
        type: Sequelize.DOUBLE
      },
      payment_status:{
        type: Sequelize.STRING,
        defaultValue: 'waiting'
      },
      midtrans_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      midtrans_booking_code:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
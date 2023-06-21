'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tikets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seat_id: {
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER
      },
      type_of_class: {
        type: Sequelize.ENUM(['Economy Class','Business Class','First Class','Premium Class'])
      },
      type_of_passenger:{
        type: Sequelize.ENUM(['Adult','Child','Baby'])
      },
      price: {
        type: Sequelize.DOUBLE
      },
      passenger_id:{
        type: Sequelize.INTEGER
      },
      transaction_id:{
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('tikets');
  }
};
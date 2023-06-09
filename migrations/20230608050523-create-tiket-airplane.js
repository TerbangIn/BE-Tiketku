'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tiket_airplanes', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        type: Sequelize.UUID
      },
      seat_id: {
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER
      },
      date_of_purchase: {
        type: Sequelize.DATE
      },
      max_kg: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tiket_airplanes');
  }
};
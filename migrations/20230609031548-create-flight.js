'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      flight_number: {
        type: Sequelize.STRING
      },
      airline: {
        type: Sequelize.STRING
      },
      source_airport: {
        type: Sequelize.INTEGER
      },
      destination_airport: {
        type: Sequelize.INTEGER
      },
      departure_date: {
        type: Sequelize.DATE
      },
      arrival_date: {
        type: Sequelize.DATE
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      economy_class_price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      business_class_price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      first_class_price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      premium_price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      adult_price_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      child_price_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      baby_price_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('flights');
  }
};
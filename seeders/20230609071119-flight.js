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

    await queryInterface.bulkInsert('flights', [
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Garuda Indonesia",
        source_airport: 1,
        destination_airport: 18,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 3)),
        capacity: 72,
        economy_class_price: 2100000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Batik Air",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        first_class_price: 1700000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Batik Air",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        business_class_price: 1350000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Citilink",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 12)),
        capacity: 36,
        premium_price: 2000000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Citilink",
        source_airport: 1,
        destination_airport: 18,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 10)),
        capacity: 36,
        economy_class_price: 1400000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Garuda Indonesia",
        source_airport: 1,
        destination_airport: 18,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        economy_class_price: 1000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Fly Emirates",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 28)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 34)),
        capacity: 36,
        business_class_price: 1750000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Fly Emirates",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 28)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 34)),
        capacity: 36,
        first_class_price: 1600000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Fly Emirates",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 72)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 78)),
        capacity: 36,
        economy_class_price: 1150000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('flights', null, {});
  }
};

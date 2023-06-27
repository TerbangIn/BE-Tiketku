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
   
   

      await queryInterface.bulkInsert('flights', [{
        image: 'https://cdn1.katadata.co.id/media/images/thumb/2019/03/30/2019_03_30-00_44_33_b033c07a3ca6a4944cc7f5a2f072ce34_960x640_thumb.jpg',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Garuda Indonesia",
        source_airport: 1,
        destination_airport: 3,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 3)),
        capacity: 72,
        economy_class_price: 1500000,
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
        source_airport: 1,
        destination_airport: 5,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        economy_class_price: 1100000,
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
        source_airport: 1,
        destination_airport: 5,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        economy_class_price: 1100000,
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
        destination_airport: 7,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 12)),
        capacity: 36,
        economy_class_price: 9000000,
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
        destination_airport: 8,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 10)),
        capacity: 36,
        economy_class_price: 10100000,
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
        source_airport: 8,
        destination_airport: 1,
        departure_date: new Date(),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 4)),
        capacity: 36,
        economy_class_price: 1100000,
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
        source_airport: 12,
        destination_airport: 15,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 28)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 34)),
        capacity: 36,
        economy_class_price: 1100000,
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
        source_airport: 12,
        destination_airport: 15,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 28)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 34)),
        capacity: 36,
        economy_class_price: 1100000,
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
        source_airport: 20,
        destination_airport: 1,
        departure_date: new Date(new Date().setHours(new Date().getHours() + 72)),
        arrival_date: new Date(new Date().setHours(new Date().getHours() + 78)),
        capacity: 36,
        economy_class_price: 1100000,
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

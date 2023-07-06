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

    function getRandomDateRange() {
      const minHours = 2;
      const maxHours = 8;

      const startDate = getRandomDate();
      const randomHours = Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours;
      const endDate = new Date(startDate.getTime() + randomHours * 60 * 60 * 1000);

      return endDate
    }

    function getRandomDate() {
      const start = new Date();
      const end = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return randomDate;
    }

    await queryInterface.bulkInsert('flights', [
      {
        image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Garuda Indonesia",
        source_airport: 1,
        destination_airport: 18,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 72,
        economy_class_price: 2100000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1541843713287-e0d5de49a384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Singapore Airlines",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        first_class_price: 1700000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Qatar Airways",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        business_class_price: 1350000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1558818061-547b1114aa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "ANA All Nippon Airways",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        premium_price: 2000000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Indonesia AirAsia",
        source_airport: 1,
        destination_airport: 18,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        economy_class_price: 1400000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Lion Air",
        source_airport: 1,
        destination_airport: 18,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        economy_class_price: 1000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1578010505412-502fc0ff245b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Cathay Pacific Airways",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        business_class_price: 1750000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1586010596885-41bff580f6e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "British Airways",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
        capacity: 36,
        first_class_price: 1600000,
        adult_price_percentage: 100,
        child_price_percentage: 60,
        baby_price_percentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://images.unsplash.com/photo-1585086813715-f468e3fc6d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        flight_number: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
        airline: "Fly Emirates",
        source_airport: Math.floor(Math.random() * 18) + 1,
        destination_airport: Math.floor(Math.random() * 18) + 1,
        departure_date: getRandomDate(),
        arrival_date: getRandomDateRange(),
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

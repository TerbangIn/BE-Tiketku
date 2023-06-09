'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.information_flight,{
        foreignKey: "flight_id",
        as: "information"
      })

      this.belongsTo(models.airport,{
        foreignKey: "source_airport",
        as: "source"
      })

      this.belongsTo(models.airport,{
        foreignKey: "destination_airport",
        as: "destination"
      })


    }
  }
  flight.init({
    image: DataTypes.STRING,
    flight_number: DataTypes.STRING,
    airline: DataTypes.STRING,
    source_airport: DataTypes.INTEGER,
    destination_airport: DataTypes.INTEGER,
    departure_date: DataTypes.DATE,
    arrival_date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    seat_id: DataTypes.STRING,
    economy_class_price: DataTypes.DOUBLE,
    business_class_price: DataTypes.DOUBLE,
    first_class_price: DataTypes.DOUBLE,
    premium_price: DataTypes.DOUBLE,
    adult_price_percentage: DataTypes.INTEGER,
    child_price_percentage: DataTypes.INTEGER,
    baby_price_percentage: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'flight',
  });
  return flight;
};
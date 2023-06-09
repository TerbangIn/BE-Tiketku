'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tiket_airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.seat,{
      //   foreignKey: "seat_id",
      //   as: "seat"
      // })

      // this.hasMany(models.flight,{
      //   foreignKey: "flight_id",
      //   as: "flight"
      // })
    }
  }
  tiket_airplane.init({
    seat_id: DataTypes.STRING,
    flight_id: DataTypes.STRING,
    date_of_purchase: DataTypes.DATE,
    max_kg: DataTypes.STRING,
    type_of_class: DataTypes.ENUM(['Economy Class','Business Class','First Class','Premium Class']),
    type_of_passenger: DataTypes.ENUM(['Adult','Child','Baby']),
    price: DataTypes.DOUBLE,
    passenger_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tiket_airplane',
  });
  return tiket_airplane;
};
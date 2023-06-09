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
      this.belongsTo(models.seat,{
        foreignKey: "seat_id",
        as: "seat"
      })

      this.belongsTo(models.flight,{
        foreignKey: "flight_id",
        as: "flight"
      })

      this.belongsTo(models.passenger,{
        foreignKey: "passenger_id",
        as: "passenger"
      })

      this.belongsTo(models.transaction,{
        foreignKey: "transaction_id",
        as: "transaction"
      })
    }
  }
  tiket_airplane.init({
    seat_id: DataTypes.INTEGER,
    flight_id: DataTypes.INTEGER,
    max_kg: DataTypes.STRING,
    type_of_class: DataTypes.ENUM(['Economy Class','Business Class','First Class','Premium Class']),
    type_of_passenger: DataTypes.ENUM(['Adult','Child','Baby']),
    price: DataTypes.DOUBLE,
    passenger_id: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tiket_airplane',
  });
  return tiket_airplane;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.flight,{
        foreignKey: "flight_id",
        as: "flight"
      })

      this.belongsTo(models.ticket_airplane,{
        foreignKey: "ticket_id",
        as: "ticket"
      })
    }
  }
  seat.init({
    seat_number: DataTypes.STRING,
    ticket_id: DataTypes.INTEGER,
    flight_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'seat',
  });
  return seat;
};
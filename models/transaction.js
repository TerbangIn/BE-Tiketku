'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user,{
        foreignKey: "user_id",
        as: "user"
      })

      this.belongsTo(models.payment,{
        foreignKey: "payment_id",
        as: "payment"
      })

      this.hasMany(models.booking,{
        foreignKey: "booking_id",
        as: "booking"
      })
    }
  }
  transaction.init({
    booking_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DOUBLE,
    trans_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
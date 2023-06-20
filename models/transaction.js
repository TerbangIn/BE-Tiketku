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
      // this.hasMany(models.user,{
      //   foreignKey: "user_id",
      //   as: "users"
      // })

      // this.belongsTo(models.payment,{
      //   foreignKey: "payment_id",
      //   as: "payment"
      // })

      this.hasMany(models.ticket_airplane,{
        foreignKey: "ticket_id",
        as: "ticket"
      })
    }
  }
  transaction.init({
    ticket_id: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    status: DataTypes.STRING,
    total_price: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
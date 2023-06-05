'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey: "id_user",
        as: "user"
      })
    }
  }
  transaksi.init({
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};
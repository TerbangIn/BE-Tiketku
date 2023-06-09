'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  passenger.init({
    title: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    country: DataTypes.STRING,
    identity_number: DataTypes.BIGINT,
    identity_number_of_country: DataTypes.STRING,
    expired_date : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'passenger',
  });
  return passenger;
};
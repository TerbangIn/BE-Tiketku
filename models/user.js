'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    identity_number: DataTypes.BIGINT,
    address: DataTypes.STRING,
   
    phone_number: DataTypes.STRING,
    gender: DataTypes.ENUM(['Male','Female']),
    google_id: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM(['admin', 'user']),
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
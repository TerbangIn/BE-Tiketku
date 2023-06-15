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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    google_id: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM(['admin', 'user']),
      defaultValue: 'user'
    },
    otp: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    expiration_time: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
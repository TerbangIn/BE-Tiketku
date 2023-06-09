'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey: "user_id",
        as: "users"
      })
    }
  }
  notification.init({
    tag: DataTypes.ENUM(['Promosi','Notifikasi']),
    title: DataTypes.TEXT,
    desc: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};
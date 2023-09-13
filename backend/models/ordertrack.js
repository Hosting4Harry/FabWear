'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderTrack.init({
    orderitemid: DataTypes.INTEGER,
    orderProcess: DataTypes.BOOLEAN,
    qualitycheck: DataTypes.BOOLEAN,
    shipped: DataTypes.BOOLEAN,
    dispatched: DataTypes.BOOLEAN,
    delivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ordertrack',
  });
  return OrderTrack;
};
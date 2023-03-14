'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderitems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderitems.init({
    orderid: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    productqty: DataTypes.INTEGER,
    productprice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderitems',
  });
  return orderitems;
};
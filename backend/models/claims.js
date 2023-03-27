'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class claims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  claims.init({
    roleId: DataTypes.INTEGER,
    claims: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'claims',
  });
  return claims;
};
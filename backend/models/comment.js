'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    productId: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    comment: DataTypes.STRING,
    replyCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return Comment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentReply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentReply.init({
    commentId: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    reply: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentreply',
  });
  return CommentReply;
};
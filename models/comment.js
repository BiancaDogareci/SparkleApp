'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      
      Comment.belongsTo(models.Post, { 
        foreignKey:'postId'
      });

      // dinspre copil spre parinte
      Comment.belongsTo(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'parentComment'
      });

      // dinspre parinte spre copii
      Comment.hasMany(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'childComments'
      })
    }
  }
  Comment.init({
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    parentCommentId: DataTypes.INTEGER,
    edited: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
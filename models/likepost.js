'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class LikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LikePost.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });

      LikePost.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  LikePost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    givenAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LikePost',
  });
  return LikePost;
};
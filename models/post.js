'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Post.belongsToMany(models.Label, { 
        through: 'PostLabel', 
        onDelete: 'CASCADE',
      });
      
      Post.hasMany(models.Comment,{
        foreignKey: 'postId',
      });

      Post.hasMany(models.LikePost, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    edited: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
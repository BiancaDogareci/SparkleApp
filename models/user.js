'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId'
      });

      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      });

      User.hasOne(models.Profile, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });      
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    username:DataTypes.STRING,
    email:DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};
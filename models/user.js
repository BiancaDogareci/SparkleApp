'use strict';
import { Model, STRING } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the association from User to Post
      User.hasMany(models.Post, {
        foreignKey: 'userId',  // Specify the foreign key column in the Posts table
        as: 'posts', // Alias for reverse association
      });
    }
    
  }
  User.init({

    userId:{ type: DataTypes.INTEGER,  
      primaryKey: true,      
      autoIncrement: true,      
      allowNull: false,
     },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,         
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,           
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,      
      },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,   
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
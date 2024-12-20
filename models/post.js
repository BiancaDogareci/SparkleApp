'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defining associations with other models
      Post.belongsTo(models.User, {
        foreignKey: 'userId',  // Correctly associates with the User model
        as: 'author', // Alias for accessing the associated User
      });
      Post.belongsToMany(models.Label, {
        through: 'PostLabels',
        foreignKey: 'postId', // Specify the correct foreign key name
      });
    }
  }

  Post.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,  // Ensure this is auto-incrementing
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Ensure userId is required for every post
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,  // Title can be nullable, but adjust this based on your requirements
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,  // Content can be nullable, adjust based on requirements
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  // Default to current time if not provided
      },
      edited: {
        type: DataTypes.BOOLEAN,  
        allowNull: false, 
      },
    },
    {
      sequelize,
      modelName: 'Post',
      timestamps: true, // Enable timestamps for createdAt and updatedAt
    }
  );

  return Post;
};

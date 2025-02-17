'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Profile.init({
    userId: DataTypes.INTEGER,
    profilePhoto: DataTypes.STRING,
    bio: DataTypes.TEXT,
    website: DataTypes.STRING,
    publicEmail: DataTypes.STRING,
    language: DataTypes.STRING,
    themePreference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
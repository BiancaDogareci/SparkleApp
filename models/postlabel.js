'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class PostLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostLabel.init({
    postId: DataTypes.INTEGER,
    labelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostLabel',
    timestamps: false
  });
  return PostLabel;
};
'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // dinspre copil spre parinte
      Report.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Report.belongsTo(models.Post, {
        foreignKey: 'postId',
      });

    }
  }
  Report.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
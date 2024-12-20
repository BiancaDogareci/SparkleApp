'use strict';
import  {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Label.belongsToMany(models.Post, { through: 'PostLabel', onDelete: 'CASCADE',});
    }
  }
  Label.init({
    name: DataTypes.STRING,
    usage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Label',
  });
  return Label;
};
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
      Label.belongsToMany(models.Post, { through: 'PostLabel' });
    }
  }
  Label.init({
    labelId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,  // Ensure this is auto-incrementing
    }, 
    name: DataTypes.STRING,
    usage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Label',
  });
  return Label;
};
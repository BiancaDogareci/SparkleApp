'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class LikeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LikeComment.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE'
      });

      LikeComment.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }

  LikeComment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Parte din PK compusa
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Parte din PK compusa
      },
      givenAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'LikeComment',
      timestamps: false, // Disable createdAt si updatedAt pt ca le am sters si din migrare
    }
  );

  return LikeComment;
};

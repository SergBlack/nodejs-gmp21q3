import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUserGroup } from '../interfaces/userGroup';

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class UserGroup extends Model<IUserGroup> {
    GroupId!: string;

    UserId!: string;
  }

  UserGroup.init({
    GroupId: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Groups',
        key: 'name',
      },
    },
    UserId: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserGroup',
  });

  return UserGroup;
};

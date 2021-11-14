import { DataTypes, Model, Sequelize } from 'sequelize';
import { IGroup } from '../interfaces/group';
import { Permission } from '../types/group';

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Group extends Model<IGroup> implements IGroup {
    id!: string;

    name!: string;

    permissions!: Permission[];

    createdAt!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Group.belongsToMany(models.User, {
        through: 'UserGroup',
      });
    }
  }
  Group.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: dataTypes.ARRAY(dataTypes.STRING),
    },
    createdAt: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });

  return Group;
};

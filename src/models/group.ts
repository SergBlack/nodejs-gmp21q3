import { Model } from 'sequelize';
import { IGroup } from '../interfaces/group';
import { Permission } from '../types/group';

module.exports = (sequelize: any, DataTypes: any) => {
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
    /* static associate(models: any) {
      // define association here
    } */
  }
  Group.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });

  return Group;
};

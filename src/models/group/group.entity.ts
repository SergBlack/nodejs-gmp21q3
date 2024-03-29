import {
  DataTypes, Model, Optional,
} from 'sequelize';
import sequelize from '@db/config';
import { Permission } from '@common/types/group';
import { IGroup } from './group.interface';

type IGroupCreationAttributes = Optional<IGroup, 'id'>

class Group extends Model<IGroup, IGroupCreationAttributes> implements IGroup {
  public id!: string;

  public name!: string;

  public permissions!: Permission[];

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Group.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
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

export default Group;

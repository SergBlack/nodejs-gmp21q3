import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config';
import { IUserGroup } from '../common/interfaces/userGroup';

type IUserGroupCreationAttributes = Optional<IUserGroup, 'id'>

class UserGroup extends Model<IUserGroup, IUserGroupCreationAttributes> implements IUserGroup {
  public id!: number;

  public GroupId!: string;

  public UserId!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

UserGroup.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  GroupId: {
    type: DataTypes.UUIDV4,
    references: {
      model: 'Groups',
      key: 'id',
    },
  },
  UserId: {
    type: DataTypes.UUIDV4,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserGroup',
});

export default UserGroup;

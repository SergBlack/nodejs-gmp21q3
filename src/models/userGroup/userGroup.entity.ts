import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '@db/config';
import { IUserGroup } from './userGroup.interface';
import User from '../user/user.entity';
import Group from '../group/group.entity';

type IUserGroupCreationAttributes = Optional<IUserGroup, 'id'>

class UserGroup extends Model<IUserGroup, IUserGroupCreationAttributes> implements IUserGroup {
  public id!: number;

  public GroupId!: string;

  public UserId!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Group.belongsToMany(User, {
  through: 'UserGroup',
});

User.belongsToMany(Group, {
  through: 'UserGroup',
});

UserGroup.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  GroupId: {
    type: DataTypes.UUID,
    references: {
      model: 'Groups',
      key: 'id',
    },
  },
  UserId: {
    type: DataTypes.UUID,
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

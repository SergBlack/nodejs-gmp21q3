import {
  DataTypes, Model, Optional,
} from 'sequelize';
import sequelize from '../../db/config';
import { IUser } from './user.interface';

export type IUserCreationAttributes = Optional<IUser, 'id'>

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public id!: string;

  public login!: string;

  public password!: string;

  public age!: number;

  public isDeleted!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;

import { Model } from 'sequelize';
import { IUser } from '../types';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser> implements IUser {
    id!: string;

    login!: string;

    password!: string;

    age!: number;

    createdAt!: string;

    isDeleted!: boolean;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* static associate(models: any) {
      // define association here
    } */
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

  return User;
};

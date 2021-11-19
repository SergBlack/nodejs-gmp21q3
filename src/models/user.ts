import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUser } from '../interfaces/user';

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
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
    static associate(models: any) {
      User.belongsToMany(models.Group, {
        through: 'UserGroup',
      });
    }
  }
  User.init({
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: dataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING(64),
      allowNull: false,
    },
    age: {
      type: dataTypes.INTEGER,
    },
    isDeleted: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

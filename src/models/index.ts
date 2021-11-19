/* eslint-disable global-require,no-path-concat */
import fs from 'fs';
import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { users } from '../db/seeders/users';
import { groups } from '../db/seeders/groups';
import { userGroups } from '../db/seeders/userGroups';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
export const db: any = {};

let sequelize: any;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] || '', config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const createEntities = () => {
  users.forEach(user => {
    db.User.create(user);
  });
  groups.forEach(group => {
    db.Group.create(group);
  });
  userGroups.forEach(userGroup => {
    db.UserGroup.create(userGroup);
  });
};

// createEntities();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

import fs from 'fs';
import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { users } from '../seeders/users';
import { groups } from '../seeders/groups';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line no-path-concat
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
    // eslint-disable-next-line global-require
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
};

// createEntities();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

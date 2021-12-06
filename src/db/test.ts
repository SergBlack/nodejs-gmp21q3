import { Sequelize } from 'sequelize';

import { testPgConnection } from './pg-test';
import { Logger } from '@common/utils/logger';

const {
  DB_HOST, DB_NAME = '', DB_USERNAME = '', DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
});

const test = async () => {
  try {
    await sequelize.authenticate();
    Logger.log('Connection has been established successfully.');
  } catch (error) {
    Logger.error('Unable to connect to the database:', error);
  } finally {
    sequelize.close();
  }
};

test();
testPgConnection();

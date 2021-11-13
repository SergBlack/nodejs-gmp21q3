require('dotenv').config();

const {
  DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_test',
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_prod',
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
};

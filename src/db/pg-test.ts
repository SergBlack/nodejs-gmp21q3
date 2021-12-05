import { Client } from 'pg';
import { Logger } from '../common/utils/logger';

const {
  DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD,
} = process.env;

const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
});

export const testPgConnection = () => {
  client.connect();

  client.query('SELECT * FROM user')
    .then(res => {
      Logger.log({ res });
      Logger.table(res.fields);
      Logger.table(res.rows);

      Logger.log('Connection has been established successfully.');
    }).catch(err => {
      Logger.error('Unable to connect to the database.', err);
      throw err;
    })
    .finally(() => {
      client.end();
    });
};

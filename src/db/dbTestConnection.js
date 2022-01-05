import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export const dbTestConnection = async () => {
  client.connect()
    .then(() => {
      client.query('SELECT * FROM user')
        .then(res => {
          console.log({ res });
          console.table(res.fields);
          console.table(res.rows);
          console.log('Connection has been established successfully.');
        }).catch(err => {
          console.error('Unable to connect to the database.', err);
          throw err;
        })
        .finally(() => {
          client.end();
          console.log('Connection was closed.');
        });
    })
    .catch(e => console.log(e));
};

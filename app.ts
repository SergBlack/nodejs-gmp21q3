import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './src/api/routes/user.routes';
import groupsRouter from './src/api/routes/group.routes';
import { db } from './src/models';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use('/users', usersRouter);
  app.use('/groups', groupsRouter);

  app.get('/', (req, res) => {
    res.send('Welcome to the users API!');
  });

  app.get('*', (req, res) => {
    res.status(404).json({ error: 'No such route exists!' });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  }).on('error', err => {
    process.exit(1);
  });
};

db.sequelize.sync().then(startServer);

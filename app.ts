import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import initDb from './src/db/init';
import usersRouter from './src/api/routes/user.routes';
import groupsRouter from './src/api/routes/group.routes';
import userGroupsRouter from './src/api/routes/userGroup.routes';
import { Logger } from './src/utils/logger';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app: Application = express();

  app.use(bodyParser.json());
  app.use('/users', usersRouter);
  app.use('/groups', groupsRouter);
  app.use('/userGroup', userGroupsRouter);

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the users API!');
  });

  app.get('*', (req, res) => {
    res.status(404).json({ error: 'No such route exists!' });
  });

  app.listen(PORT, () => {
    Logger.log(`Server running on port: http://localhost:${PORT}`);
  }).on('error', (err: Error) => {
    Logger.error(err);
    process.exit(1);
  });
};

initDb().then(startServer).catch(Logger.error);

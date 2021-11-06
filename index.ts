import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './routes/user.routes';
import { db } from './models';
import { users } from './seeders/users';
import { IUser } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the users API!');
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'No such route exists!' });
});

const createUser = () => {
  users.forEach(user => {
    db.User.create(user);
  });
};

// createUser();

db.User.findAll()
  .then((res: (IUser)[]) => console.log(JSON.stringify(res)))
  .catch((err: any) => console.error(err));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
});

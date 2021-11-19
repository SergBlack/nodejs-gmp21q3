import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './src/api/routes/user.routes';
import { db } from './src/models';
import { users } from './src/db/seeders/users';

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

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
});

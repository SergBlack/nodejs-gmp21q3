import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';

const app = express();
const PORT = 3010;

app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the users API!');
});
app.get('*', (req, res) => {
  res.status(404).json({ error: 'No such route exists!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

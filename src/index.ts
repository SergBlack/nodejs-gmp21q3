import express from 'express';

const app = express();
const PORT = 3010;

app.get('/', (req, res) => {
  res.send('Hello user!');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

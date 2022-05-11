import express from 'express';
import admins from './data/admins.json';
import timeSheets from './resources/time-sheets';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// ROUTES
app.use('/api/time-sheets', timeSheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

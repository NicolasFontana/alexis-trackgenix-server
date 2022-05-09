// use "import" to import libraries
const express = require('express');

// use "require" to import JSON files
const admins = require('./data/admins.json');

// routes
const routes = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use(express.json());
app.use('/super-admins', routes);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

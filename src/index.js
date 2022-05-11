const express = require('express');
// use "require" to import JSON files
const projects = require('./data/projects.json');
const router = require('./resources/projects');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/projects', router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/projects', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

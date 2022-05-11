// use "import" to import libraries
// import express from 'express';

import express from 'express';
import routerProjects from './resources/projects';
// use "import" to import JSON files
import admins from './data/admins.json';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/projects', routerProjects);

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

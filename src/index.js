import express from 'express';
import router from './resources/projects';

import admins from './data/admins.json';
// use "import" to import libraries
// import express from 'express';
import employeesRoute from './resources/employees';

// routes
import superAdmins from './resources/super-admins';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.json());

app.use('/api/projects', router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use(express.json());
app.use('/super-admins', superAdmins);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

// routes
app.use('/api/employees', employeesRoute);

import express from 'express';
import timeSheets from './resources/time-sheets';
// use "import" to import libraries
// import express from 'express';
import employeesRoute from './resources/employees';
import superAdmins from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// ROUTES
app.use('/api/time-sheets', timeSheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
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

import express from 'express';
import timeSheets from './resources/time-sheets';
import resAdmin from './resources/admins';
import employeesRoute from './resources/employees';
import superAdmins from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/time-sheets', timeSheets);
app.use('/api/admins', resAdmin);
app.use('/super-admins', superAdmins);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

// routes
app.use('/api/employees', employeesRoute);

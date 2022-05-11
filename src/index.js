// use "import" to import libraries
// import express from 'express';
import express from 'express';
import resAdmin from './resources/admins';
import employeesRoute from './resources/employees';

// routes
import superAdmins from './resources/super-admins';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Admins API routes
app.use('/api/admins', resAdmin);
app.use('/super-admins', superAdmins);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

// routes
app.use('/api/employees', employeesRoute);

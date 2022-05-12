import express from 'express';
import taskRouter from './resources/tasks';
import timeSheets from './resources/time-sheets';
import resAdmin from './resources/admins';
import superAdmins from './resources/super-admins';
import employeesRoute from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/time-sheets', timeSheets);
app.use('/api/admins', resAdmin);
app.use('/super-admins', superAdmins);
app.use('/api/tasks', taskRouter);
app.use('/api/employees', employeesRoute);

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});

import express from 'express';
import resAdmin from './resources/admins';
import employeesRoute from './resources/employees';
import routerProjects from './resources/projects';
import superAdmins from './resources/super-admins';
import tasksRouter from './resources/tasks';
import timeSheets from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/admins', resAdmin);
app.use('/api/employees', employeesRoute);
app.use('/api/projects', routerProjects);
app.use('/api/super-admins', superAdmins);
app.use('/api/tasks', tasksRouter);
app.use('/api/time-sheets', timeSheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});

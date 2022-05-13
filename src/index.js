import express from 'express';
import mongoose from 'mongoose';

import resAdmin from './controllers/admins';
import employeesRoute from './controllers/employees';
import projectRouter from './controllers/projects';
import superAdmins from './controllers/super-admins';
import taskRouter from './controllers/tasks';
import timeSheets from './controllers/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

const URI = 'mongodb+srv://pucheRR:BaSP2022@cluster0.3uv6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/admins', resAdmin);
app.use('/api/employees', employeesRoute);
app.use('/api/projects', projectRouter);
app.use('/api/super-admins', superAdmins);
app.use('/api/tasks', taskRouter);
app.use('/api/time-sheets', timeSheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});

export default mongoose;

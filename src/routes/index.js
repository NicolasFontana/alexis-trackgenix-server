import express from 'express';
import tasksRoutes from './tasks';
import adminsRouter from './admins';
import superadminRoutes from './super-admins';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import timeSheetsRoutes from './time-sheets';

const router = express.Router();

router
  .use('/api/tasks', tasksRoutes)
  .use('/api/admins', adminsRouter)
  .use('/api/superadmin', superadminRoutes)
  .use('/api/employees', employeeRoutes)
  .use('/api/projects', projectRoutes)
  .use('/api/time-sheets', timeSheetsRoutes);

export default router;

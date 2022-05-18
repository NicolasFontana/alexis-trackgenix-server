import express from 'express';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import timeSheetsRoutes from './time-sheets';

const router = express.Router();

router
  .use('/api/employees', employeeRoutes)
  .use('/api/projects', projectRoutes)
  .use('/api/time-sheets', timeSheetsRoutes);

export default router;

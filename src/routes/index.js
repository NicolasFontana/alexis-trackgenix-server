import express from 'express';
import projectRoutes from './projects';
import timeSheetsRoutes from './time-sheets';

const router = express.Router();

router
  .use('/api/projects', projectRoutes)
  .use('/api/time-sheets', timeSheetsRoutes);

export default router;

import express from 'express';
import timeSheetsRoutes from './time-sheets';

const router = express.Router();
router
  .use('/api/time-sheets', timeSheetsRoutes);

export default router;

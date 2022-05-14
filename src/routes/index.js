import express from 'express';
import superadminRoutes from './super-admins';

const router = express.Router();

router
  .use('/api/superadmin', superadminRoutes);

export default router;

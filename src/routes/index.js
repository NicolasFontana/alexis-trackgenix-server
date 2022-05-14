import express from 'express';

import adminsRouter from './admins';

const router = express.Router();

router
  .use('/api/admins', adminsRouter);

export default router;

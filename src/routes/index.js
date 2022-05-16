import express from 'express';
import projectRoutes from './projects';

const router = express.Router();

router.use('/api/projects', projectRoutes);

export default router;

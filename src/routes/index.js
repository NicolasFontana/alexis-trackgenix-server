import express from 'express';
import employeeRoutes from './employees';

const router = express.Router();

router.use('/api/employees', employeeRoutes);

export default router;

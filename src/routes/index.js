import express from 'express';
import employeeRoutes from './employees';

const router = express.Router();

router.use('./projects.js', employeeRoutes);

export default router;

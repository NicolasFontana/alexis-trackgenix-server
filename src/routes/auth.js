import express from 'express';
import getMe from '../controllers/auth';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getMe);

export default router;

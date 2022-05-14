import express from 'express';
import timeSheetsContoller from '../controllers/time-sheets';

const router = express.Router();

router.get('/', timeSheetsContoller.getAllTimesheets);

export default router;

import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidator from '../validation/time-sheets';

const router = express.Router();

router.get('/', timeSheetsController.getAllTimesheets);
router.get('/:id', timeSheetsController.getByIdTimesheets);
router.put('/:id', timeSheetsValidator.updateValidation, timeSheetsController.updateTimeSheet);

export default router;

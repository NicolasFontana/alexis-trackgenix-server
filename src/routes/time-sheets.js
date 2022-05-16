import express from 'express';
import timeSheetsContoller from '../controllers/time-sheets';
import timeSheetValidation from '../validation/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetsContoller.getAllTimesheets)
  .post('/', timeSheetValidation.createTimeValidation, timeSheetsContoller.createTimesheet)
  .delete('/:id', timeSheetsContoller.deleteTimesheet);

export default router;

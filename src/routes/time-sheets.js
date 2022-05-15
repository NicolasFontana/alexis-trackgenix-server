import express from 'express';
import timeSheetsContoller from '../controllers/time-sheets';
import timeSheetValidation from '../validation/time-sheets';

const router = express.Router();

router
  .get('/api/timesheets/', timeSheetsContoller.getAllTimesheets)
  .post('/api/timesheets/', timeSheetValidation.createTimeValidation, timeSheetsContoller.createTimesheet)
  .delete('/api/timesheets/:id', timeSheetsContoller.deleteTimesheet);

export default router;

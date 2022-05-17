import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidator from '../validation/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetsController.getAllTimesheets)
  .get('/:id', timeSheetsController.getByIdTimesheets)
  .get('/role/:role', timeSheetsController.getByRoleTimesheets)
  .get('/project/:projectId', timeSheetsController.getByProjecTimesheets)
  .get('/employee/:employeeId', timeSheetsController.getByEmployeeTimesheets)
  .get('/task/:taskId', timeSheetsController.getByTaskTimesheets)
  .get('/validated/:validated', timeSheetsController.getByValidatedTimesheets)
  // .get('/date/:date', timeSheetsController.getByDateTimesheets)
  .put('/:id', timeSheetsValidator.updateValidation, timeSheetsController.updateTimeSheet)
  .post('/', timeSheetsValidator.createTimeValidation, timeSheetsController.createTimesheet)
  .delete('/:id', timeSheetsController.deleteTimesheet);

export default router;

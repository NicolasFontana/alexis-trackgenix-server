import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidator from '../validation/time-sheets';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authUser, timeSheetsController.getAllTimesheets)
  // .get('/date', timeSheetsController.getBetweenDatesTimesheets)
  // .get('/role/:role', timeSheetsController.getByRoleTimesheets)
  // .get('/project/:projectId', timeSheetsController.getByProjecTimesheets)
  // .get('/employee/:employeeId', timeSheetsController.getByEmployeeTimesheets)
  // .get('/pm/:projectManagerId', timeSheetsController.getByPMTimesheets)
  // .get('/task/:taskId', timeSheetsController.getByTaskTimesheets)
  // .get('/validated/:validated', timeSheetsController.getByValidatedTimesheets)
  // .get('/:id', timeSheetsController.getByIdTimesheets)
  .put('/:id', authMiddleware.authUser, timeSheetsValidator.updateValidation, timeSheetsController.updateTimeSheet)
  .post('/', authMiddleware.authUser, timeSheetsValidator.createTimeValidation, timeSheetsController.createTimesheet)
  .delete('/:id', authMiddleware.authUser, timeSheetsController.deleteTimesheet);

export default router;

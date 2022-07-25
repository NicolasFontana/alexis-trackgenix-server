import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidator from '../validation/time-sheets';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authUser, timeSheetsController.getAllTimesheets)
  .get('/deleted', authMiddleware.authAdmin, timeSheetsController.getDeletedTimesheets)
  .put('/:id', authMiddleware.authUser, timeSheetsValidator.updateValidation, timeSheetsController.updateTimeSheet)
  .post('/', authMiddleware.authUser, timeSheetsValidator.createTimeValidation, timeSheetsController.createTimesheet)
  .delete('/:id', authMiddleware.authUser, timeSheetsController.deleteTimesheet);

export default router;

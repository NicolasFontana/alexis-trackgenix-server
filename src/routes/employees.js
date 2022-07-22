import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validation/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authAdmin, employeeController.getAllEmployees)
  .post('/', employeeValidation.createEmployeeValidation, employeeController.createEmployee)
  .put('/:id', authMiddleware.authUser, employeeValidation.updateEmployeeValidation, employeeController.updateEmployee)
  .delete('/:id', authMiddleware.authAdmin, employeeController.deleteEmployee);

export default router;

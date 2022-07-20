import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validation/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authAdmin, employeeController.getAllEmployees)
  .post('/', employeeValidation.createEmployeeValidation, employeeController.createEmployee)
// .get('/:id', employeeController.getEmployeeById);
// .get('/firstName/:firstName', employeeController.getEmployeeByFirstName);
// .get('/lastName/:lastName', employeeController.getEmployeeByLastName);
// .get('/active/:active', employeeController.getEmployeeByActivity);
  .put('/:id', authMiddleware.authUser, employeeValidation.updateEmployeeValidation, employeeController.updateEmployee)
  .delete('/:id', authMiddleware.authAdmin, employeeController.deleteEmployee);

export default router;

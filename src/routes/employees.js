import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validation/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authUser, employeeController.getAllEmployees)
  .get('/deleted', authMiddleware.authAdmin, employeeController.getDeletedEmployees)
  .post('/', employeeValidation.createEmployeeValidation, employeeController.createEmployee)
  .put('/:id', authMiddleware.authUser, employeeValidation.updateEmployeeValidation, employeeController.updateEmployee)
  .delete('/:id', authMiddleware.authAdmin, employeeController.deleteEmployee)
  .put('/restore/:id', authMiddleware.authAdmin, employeeValidation.updateEmployeeValidation, employeeController.restoreEmployee)
  .delete('/remove/:id', authMiddleware.authAdmin, employeeController.removeEmployee);
export default router;

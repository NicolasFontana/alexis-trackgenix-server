import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validation/employees';

const router = express.Router();

// localhost:3000/employee/
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeValidation.createEmployeeValidation, employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.get('/firstName/:firstName', employeeController.getEmployeeByFirstName);
router.get('/lastName/:lastName', employeeController.getEmployeeByLastName);
router.get('/active/:active', employeeController.getEmployeeByActivity);
router.put('/:id', employeeValidation.updateEmployeeValidation, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;

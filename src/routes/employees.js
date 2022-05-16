import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validation/employees';

const router = express.Router();

// localhost:3000/employee/
router.get('/api/employees', employeeController.getAllEmployees);
router.post('/api/employees', employeeValidation.createEmployeeValidation, employeeController.createEmployee);
router.get('/api/employees/:id', employeeController.getEmployeeById);
router.get('/api/employees/firstName/:firstName', employeeController.getEmployeeByFirstName);
router.get('/api/employees/lastName/:lastName', employeeController.getEmployeeByLastName);
router.get('/api/employees/active/:active', employeeController.getEmployeeByActivity);
router.put('/api/employees/:id', employeeValidation.updateEmployeeValidation, employeeController.updateEmployee);
router.delete('/api/employees/:id', employeeController.deleteEmployee);

export default router;

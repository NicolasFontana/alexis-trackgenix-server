import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidation from '../validation/tasks';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .get('/taskDescription/:description', tasksControllers.getTaskByDescription)
  .post('/', tasksValidation.validateCreation, tasksControllers.createTask)
  .put('/:id', tasksValidation.validateUpdate, tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;

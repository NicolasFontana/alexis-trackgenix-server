import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidation from '../validation/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .post('/', tasksValidation.validateCreation, tasksControllers.createTask)
  .put('/:id', tasksValidation.validateUpdate, tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;

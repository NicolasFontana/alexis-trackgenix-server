import express from 'express';
import tasksControllers from '../controllers/tasks';
// import tasksValidation from '../validation/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .post('/', tasksControllers.createTask)
  .put('/:id', tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;

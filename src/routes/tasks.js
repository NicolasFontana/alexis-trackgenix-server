import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidation from '../validation/tasks';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authUser, tasksControllers.getAllTasks)
  // .get('/:id', tasksControllers.getTaskById)
  // .get('/taskDescription/:description', tasksControllers.getTaskByDescription)
  .post('/', authMiddleware.authUser, tasksValidation.validateCreation, tasksControllers.createTask)
  .put('/:id', authMiddleware.authUser, tasksValidation.validateUpdate, tasksControllers.updateTask)
  .delete('/:id', authMiddleware.authUser, tasksControllers.deleteTask);

export default router;

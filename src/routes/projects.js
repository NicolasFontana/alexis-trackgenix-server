import express from 'express';
import projectController from '../controllers/projects';
import validations from '../validation/projects';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
router
  .get('/', authMiddleware, projectController.getAllProjects)
  .post('/', validations.validateCreate, projectController.createNewProject)
  .get('/name/:name', projectController.getProjectByName)
  .get('/date', projectController.getByPeriod)
  .get('/client/:clientName', projectController.getProjectByClientName)
  .get('/status/:active', projectController.getProjectByStatus)
  .get('/:id', projectController.getProjectById)
  .put('/:id', validations.validateUpdate, projectController.updateProject)
  .delete('/:id', projectController.deleteProject);

export default router;

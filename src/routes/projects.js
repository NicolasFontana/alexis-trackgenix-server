import express from 'express';
import projectController from '../controllers/projects';
import validations from '../validation/projects';

const router = express.Router();
router
  .get('/', projectController.getAllProjects)
  .get('/:id', projectController.getProjectById)
  .post('/', validations.validateCreate, projectController.createNewProject)
  .get('/name/:name', projectController.getProjectByName)
  .get('/client/:clientName', projectController.getProjectByClientName)
  .get('/status/:active', projectController.getProjectByStatus)
  .put('/:id', validations.validateUpdate, projectController.updateProject)
  .delete('/:id', projectController.deleteProject);

export default router;

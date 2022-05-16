import express from 'express';
import projectsController from '../controllers/projects';
import projectsValidation from '../validation/projects';

const router = express.Router();

router
  .put('/:id', projectsValidation.validateUpdate, projectsController.updateProject)
  .delete('/:id', projectsController.deleteProject);
export default router;

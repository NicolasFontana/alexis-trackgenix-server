import express from 'express';
import projectController from '../controllers/projects';
import validation from '../validation/projects';

const router = express.Router();

router
  .put('/:id', validation.validateUpdate, projectController.updateProject)
  .delete('/:id', projectController.deleteProject);
export default router;

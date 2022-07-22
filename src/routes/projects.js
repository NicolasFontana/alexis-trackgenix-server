import express from 'express';
import projectController from '../controllers/projects';
import validations from '../validation/projects';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
router
  .get('/', authMiddleware.authUser, projectController.getAllProjects)
  .post('/', authMiddleware.authAdmin, validations.validateCreate, projectController.createNewProject)
  .put('/:id', authMiddleware.authUser, validations.validateUpdate, projectController.updateProject)
  .delete('/:id', authMiddleware.authAdmin, projectController.deleteProject);

export default router;

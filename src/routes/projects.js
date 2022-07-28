import express from 'express';
import projectController from '../controllers/projects';
import validations from '../validation/projects';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
router
  .get('/', authMiddleware.authUser, projectController.getAllProjects)
  .get('/deleted', authMiddleware.authAdmin, projectController.getDeletedProjects)
  .post('/', authMiddleware.authAdmin, validations.validateCreate, projectController.createNewProject)
  .put('/:id', authMiddleware.authUser, validations.validateUpdate, projectController.updateProject)
  .delete('/:id', authMiddleware.authAdmin, projectController.deleteProject)
  .delete('/remove/:id', authMiddleware.authAdmin, projectController.removeProject);

export default router;

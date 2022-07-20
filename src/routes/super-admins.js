import express from 'express';
import superadminsControllers from '../controllers/super-admins';
import superadminsValidation from '../validation/super-admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authSuperAdmin, superadminsControllers.getAllSuperadmins)
  .post('/', authMiddleware.authSuperAdmin, superadminsValidation.validateCreation, superadminsControllers.createSuperadmin)
  // .get('/first-name/:firstName', superadminsControllers.getFilteredSuperadminsByFirstName)
  // .get('/last-name/:lastName', superadminsControllers.getFilteredSuperadminsByLastName)
  // .get('/email/:email', superadminsControllers.getFilteredSuperadminsByEmail)
  // .get('/active/:active', superadminsControllers.getFilteredSuperadminsByActive)
  // .get('/:id', superadminsControllers.getSuperadminById)
  .put('/:id', authMiddleware.authSuperAdmin, superadminsValidation.validateUpdate, superadminsControllers.updateSuperadmin)
  .delete('/:id', authMiddleware.authSuperAdmin, superadminsControllers.deleteSuperadminById);

export default router;

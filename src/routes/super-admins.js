import express from 'express';
import superadminsControllers from '../controllers/super-admins';
import superadminsValidation from '../validation/super-admins';

const router = express.Router();

router
  .get('/', superadminsControllers.getAllSuperadmins)
  .post('/', superadminsValidation.validateCreation, superadminsControllers.createSuperadmin)
  .get('/first-name/:firstName', superadminsControllers.getFilteredSuperadminsByFirstName)
  .get('/last-name/:lastName', superadminsControllers.getFilteredSuperadminsByLastName)
  .get('/email/:email', superadminsControllers.getFilteredSuperadminsByEmail)
  .get('/password/:password', superadminsControllers.getFilteredSuperadminsByPassword)
  .get('/active/:active', superadminsControllers.getFilteredSuperadminsByActive)
  .get('/:id', superadminsControllers.getSuperadminById)
  .put('/:id', superadminsValidation.validateUpdate, superadminsControllers.updateSuperadmin)
  .delete('/:id', superadminsControllers.deleteSuperadminById);

export default router;

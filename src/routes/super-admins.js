import express from 'express';
import superadminsControllers from '../controllers/super-admins';
import superadminsValidation from '../validation/super-admins';

const router = express.Router();

router
  .get('/', superadminsControllers.getAllSuperadmins)
  .post('/', superadminsValidation.validateCreation, superadminsControllers.createSuperadmin)
  .get('/:id', superadminsControllers.getSuperadminById)
  .put('/:id', superadminsValidation.validateUpdate, superadminsControllers.updateSuperadmin)
  .delete('/:id', superadminsControllers.deleteSuperadminById);

export default router;

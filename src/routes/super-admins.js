import express from 'express';
import superadminsControllers from '../controllers/super-admins';
import superadminsValidation from '../validation/super-admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authSuperAdmin, superadminsControllers.getAllSuperadmins)
  .post('/', authMiddleware.authSuperAdmin, superadminsValidation.validateCreation, superadminsControllers.createSuperadmin)
  .put('/:id', authMiddleware.authSuperAdmin, superadminsValidation.validateUpdate, superadminsControllers.updateSuperadmin)
  .delete('/:id', authMiddleware.authSuperAdmin, superadminsControllers.deleteSuperadminById);

export default router;

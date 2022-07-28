import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validation/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authSuperAdmin, adminControllers.getAllAdmins)
  .get('/deleted', authMiddleware.authSuperAdmin, adminControllers.getDeletedAdmins)
  .delete('/:id', authMiddleware.authSuperAdmin, adminControllers.deleteAdmin)
  .post('/', authMiddleware.authSuperAdmin, adminValidations.createAdminValidations, adminControllers.createAdmin)
  .put('/:id', authMiddleware.authSuperAdmin, adminValidations.updateAdminValidations, adminControllers.updateAdmin)
  .put('/restore/:id', authMiddleware.authSuperAdmin, adminValidations.updateAdminValidations, adminControllers.restoreAdmin);

export default router;

import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validation/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authSuperAdmin, adminControllers.getAllAdmins)
  // .get('/id/:id', adminControllers.getAdminById)
  // .get('/firstName/:firstName', adminControllers.getAdminByFirstName)
  // .get('/lastName/:lastName', adminControllers.getAdminByLastName)
  // .get('/email/:email', adminControllers.getAdminByEmail)
  .delete('/:id', authMiddleware.authSuperAdmin, adminControllers.deleteAdmin)
  .post('/', authMiddleware.authSuperAdmin, adminValidations.createAdminValidations, adminControllers.createAdmin)
  .put('/:id', authMiddleware.authSuperAdmin, adminValidations.updateAdminValidations, adminControllers.updateAdmin);

export default router;

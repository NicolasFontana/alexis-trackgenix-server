import express from 'express';
import timeSheetsContoller from '../controllers/time-sheets';
// import timeSheetsValidator from....
const router = express.Router();

router.get('/', timeSheetsContoller.getAllTimesheets);
router.get('/:id', timeSheetsContoller.getByIdTimesheets);
router.put('/:id', timeSheetsContoller.updateTimeSheet);

export default router;

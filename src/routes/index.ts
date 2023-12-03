import express from 'express';
import { index, uploadExcel } from '../controllers/RealEstateTransactionsController';

const router = express.Router();

router.get('/', index);
router.post('/uploadExcel', uploadExcel);

export default router;
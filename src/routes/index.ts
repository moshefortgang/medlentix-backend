import express from 'express';
import { index, uploadExcel } from '../controllers/RealEstateTransactionsController';
import { dataRemi as ramiController } from '../controllers/RamiController';

const router = express.Router();

router.get('/', index);
router.post('/uploadExcel', uploadExcel);
router.get('/ramiController', ramiController);

export default router;
import express from 'express';
import { index, uploadExcel } from '../controllers/RealEstateTransactionsController';
import { fetchDataFromRami  } from '../controllers/RamiController';

const router = express.Router();

router.get('/', index);
router.post('/uploadExcel', uploadExcel);
router.get('/ramiController', fetchDataFromRami);

export default router;
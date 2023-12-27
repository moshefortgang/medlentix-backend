import express from 'express';
import { index, uploadExcel } from '../controllers/RealEstateTransactionsController';
import { fetchDataFromRami  } from '../controllers/RamiController';
import { fetchDataFromNadlanGov } from '../controllers/NadlanGovAPIController';

const router = express.Router();

router.get('/', index);
router.post('/uploadExcel', uploadExcel);
router.get('/ramiController', fetchDataFromRami);
router.get('/fetchDataFromNadlanGov', fetchDataFromNadlanGov);

export default router;
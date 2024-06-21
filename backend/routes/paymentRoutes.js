import express from 'express';
import { checkout, paymentVerification } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/payment', checkout);
router.post('/paymentverification', paymentVerification);

export default router;
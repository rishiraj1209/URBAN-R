import { Router } from 'express';
import { getAllTrainings, createTraining, getMyTrainings } from '../controllers/trainingController.js';
import { protect } from '../middlewares/protect.js';

const router = Router();

router.get('/', getAllTrainings);
router.post('/', protect, createTraining);
router.get('/mytrainings', protect, getMyTrainings);

export default router;

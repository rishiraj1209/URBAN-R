import { Router } from 'express';
import { getAllComplaints, createComplaint, updateComplaintStatus } from '../controllers/complaintController.js';
import { protect } from '../middlewares/protect.js';

const router = Router();

router.get('/', getAllComplaints);
router.post('/', protect, createComplaint);
router.patch('/:id', protect, updateComplaintStatus);

export default router;


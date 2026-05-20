import { Router } from 'express';
import { getAllComplaints, createComplaint, updateComplaintStatus, getMyComplaints } from '../controllers/complaintController.js';
import { protect, adminProtect } from '../middlewares/protect.js';

const router = Router();

router.get('/', adminProtect, getAllComplaints);
router.get('/my', protect, getMyComplaints);
router.post('/', protect, createComplaint);
router.patch('/:id', adminProtect, updateComplaintStatus);

export default router;


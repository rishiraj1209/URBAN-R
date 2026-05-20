import { Router } from 'express';
import {
  getAdminDashboard,
  getAdminDrivers,
  getAdminViolations,
  getAdminZones,
} from '../controllers/adminController.js';
import { adminProtect } from '../middlewares/protect.js';

const router = Router();

router.get('/dashboard', adminProtect, getAdminDashboard);
router.get('/drivers', adminProtect, getAdminDrivers);
router.get('/violations', adminProtect, getAdminViolations);
router.get('/zones', adminProtect, getAdminZones);

export default router;

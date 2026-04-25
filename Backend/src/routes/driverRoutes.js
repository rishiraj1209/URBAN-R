import { Router } from "express";
import { getDriverStats } from "../controllers/driverController.js";
import { getViolations } from "../controllers/violationController.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.get('/stats', protect, getDriverStats);
router.get('/violations', protect, getViolations);

export default router;
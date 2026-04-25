import { Router } from "express";
import { createRickshaw, getMyRickshaw } from "../controllers/rickshawController.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.post('/create', protect, createRickshaw);
router.get('/my', protect, getMyRickshaw);

export default router;
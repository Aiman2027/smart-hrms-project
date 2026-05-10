import express from "express";
import {
  applyLeave,
  getLeaves,
  updateLeaveStatus
} from "../controllers/leaveController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", authMiddleware, applyLeave);
router.get("/", authMiddleware, getLeaves);
router.put("/:id", authMiddleware, updateLeaveStatus);

export default router;
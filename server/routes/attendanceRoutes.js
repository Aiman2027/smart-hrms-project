import express from "express";
import { markAttendance, getAttendance } from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/", authMiddleware, getAttendance);

export default router;
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEmployee
);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getAllEmployees
);


router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getEmployeeById
);


router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEmployee
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEmployee
);

export default router;
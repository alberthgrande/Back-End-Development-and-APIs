import express from "express";
import TaskController from "../controllers/task.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.schema.js";

const router = express.Router();

// Create Task
router.post(
  "/tasks",
  validate(createTaskSchema),
  asyncHandler(TaskController.create),
);

// Get All Tasks
router.get("/tasks", asyncHandler(TaskController.getAll));

// Get Task by ID
router.get("/tasks/:id", asyncHandler(TaskController.getOne));

// Update Task
router.put(
  "/tasks/:id",
  validate(updateTaskSchema),
  asyncHandler(TaskController.update),
);

// Delete Task
router.delete("/tasks/:id", asyncHandler(TaskController.delete));

export default router;

import express from "express";
import TaskController from "../controllers/task.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/tasks", asyncHandler(TaskController.getAll));
router.get("/tasks/:id", asyncHandler(TaskController.getOne));
router.post("/tasks", asyncHandler(TaskController.create));

export default router;

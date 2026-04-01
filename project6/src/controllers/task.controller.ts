import { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";

const taskService = new TaskService();

// Get all tasks
export const controllerAll = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.serviceAll();

    if (!tasks.length) {
      return res.status(200).json({
        success: true,
        message: "No tasks found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new task
export const controllerCreate = async (req: Request, res: Response) => {
  try {
    const newTask = await taskService.serviceCreate(req.body);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one task by ID
export const controllerGetOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const task = await taskService.serviceGetOne(id);

    return res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a task by ID
export const controllerUpdate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const updatedTask = await taskService.serviceUpdate(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task by ID
export const controllerDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    await taskService.serviceDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

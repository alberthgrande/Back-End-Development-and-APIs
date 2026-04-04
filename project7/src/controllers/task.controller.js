import TaskService from "../services/task.service.js";

class TaskController {
  static async getAll(req, res) {
    const { page, limit, status } = req.query;
    const result = await TaskService.getAllTasks({ page, limit, status });
    res.status(200).json({ status: true, ...result });
  }

  static async getOne(req, res) {
    const task = await TaskService.getTaskById(req.params.id);
    if (!task)
      return res.status(404).json({ status: false, message: "Task not found" });
    res.status(200).json({ status: true, data: task });
  }

  static async create(req, res) {
    const task = await TaskService.createTask(req.body);
    res
      .status(201)
      .json({ status: true, message: "Task created successfully", data: task });
  }

  static async update(req, res) {
    const task = await TaskService.updateTask(req.params.id, req.body);
    if (!task)
      return res.status(404).json({ status: false, message: "Task not found" });
    res
      .status(200)
      .json({ status: true, message: "Task updated successfully", data: task });
  }

  static async delete(req, res) {
    const task = await TaskService.deleteTask(req.params.id);
    if (!task)
      return res.status(404).json({ status: false, message: "Task not found" });

    res
      .status(200)
      .json({ status: true, message: "Task deleted successfully " });
  }
}

export default TaskController;

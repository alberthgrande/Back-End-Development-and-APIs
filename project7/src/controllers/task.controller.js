import TaskService from "../services/task.service.js";

class TaskController {
  static async getAll(req, res) {
    const tasks = await TaskService.getAllTasks();
    res.status(201).json({ status: true, data: tasks });
  }
  static async getOne(req, res) {
    const task = await TaskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ status: true, data: task });
  }
  static async create(req, res) {
    const task = await TaskService.createTask(req.body);
    res
      .status(201)
      .json({ status: true, message: "Task create successfully", data: task });
  }
  //   static async update(req, res) {}
  //   static async delete(req, res) {}
}

export default TaskController;

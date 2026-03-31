const taskService = require("../services/task.service");

class TaskController {
  getAll = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.status(200).json({ status: "success", data: tasks });
  };

  getOne = async (req, res) => {
    const task = await taskService.getTask(req.params.id);
    res.status(200).json({ status: "success", data: task });
  };

  create = async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ status: "success", data: task });
  };

  update = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ status: "success", data: task });
  };

  delete = async (req, res) => {
    const task = await taskService.deleteTask(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "Task deleted successfully!" });
  };
}

module.exports = new TaskController();

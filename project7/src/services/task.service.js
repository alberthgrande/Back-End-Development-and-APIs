import TaskRepository from "../repositories/task.repository.js";

class TaskService {
  static async getAllTasks() {
    return await TaskRepository.findAll();
  }

  static async getTaskById(id) {
    return await TaskRepository.findById(id);
  }

  static async createTask(fields) {
    return await TaskRepository.create(fields);
  }
}

export default TaskService;

import TaskRepository from "../repositories/task.repository.js";

class TaskService {
  static async getAllTasks(query) {
    return await TaskRepository.findAll(query);
  }

  static async getTaskById(id) {
    return await TaskRepository.findById(id);
  }

  static async createTask(fields) {
    return await TaskRepository.create(fields);
  }

  static async updateTask(id, fields) {
    return await TaskRepository.update(id, fields);
  }

  static async deleteTask(id) {
    return await TaskRepository.delete(id);
  }
}

export default TaskService;

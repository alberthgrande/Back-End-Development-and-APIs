const taskRepository = require("../repositories/task.repository");
const STATUS = require("../enums/status");

const REQUIRED_FIELD = ["title", "status"];

class TaskService {
  validateRequiredFields(fields) {
    const missing = REQUIRED_FIELD.filter(
      (field) => !fields[field] || fields[field].toString().trim() === "",
    );
    if (missing.length > 0) {
      throw new Error(`Missing required field(s): ${missing.join(", ")}`);
    }
  }

  async getTasks() {
    return await taskRepository.findAll();
  }

  async getTask(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw new Error("Task not found");

    return await taskRepository.findById(id);
  }

  async createTask(fields) {
    this.validateRequiredFields(fields);

    if (!Object.values(STATUS).includes(fields.status)) {
      throw new Error(
        `Invalid status. Allowed: ${Object.values(STATUS).join(", ")}`,
      );
    }

    return await taskRepository.create(fields);
  }

  async updateTask(id, fields) {
    const task = await taskRepository.findById(id);
    if (!task) throw new Error("Task not found");

    if (fields.status && !Object.values(STATUS).includes(fields.status)) {
      throw new Error(
        `Invalid status. Allowed: ${Object.values(STATUS).join(", ")}`,
      );
    }

    Object.keys(fields).forEach((key) => {
      if (fields[key] === "" || fields[key] === null) {
        throw new Error(`${key} cannot be empty`);
      }
    });

    return await taskRepository.update(id, fields);
  }

  async deleteTask(id) {
    return await taskRepository.delete(id);
  }
}

module.exports = new TaskService();

import { TaskRepository } from "../repositories/task.repository.js";
import { Task } from "../models/task.model.js";

const taskRepository = new TaskRepository();

export class TaskService {
  async serviceAll() {
    return await taskRepository.repositoryAll();
  }

  async serviceCreate(task: Task) {
    if (!task.title || !task.description) {
      throw new Error("Title and description are required");
    }
    return await taskRepository.repositoryCreate(task);
  }

  async serviceGetOne(id: number) {
    const task = await taskRepository.repositoryGetById(id);
    if (!task) throw new Error("Task not found");
    return task;
  }

  async serviceUpdate(id: number, task: Partial<Task>) {
    const updatedTask = await taskRepository.repositoryUpdate(id, task);
    if (!updatedTask) throw new Error("Task not found or nothing to update");
    return updatedTask;
  }

  async serviceDelete(id: number) {
    const deleted = await taskRepository.repositoryDelete(id);
    if (!deleted) throw new Error("Task not found");
    return true;
  }
}

import { pool } from "../db/db.js";
import { Task } from "../models/task.model.js";

export class TaskRepository {
  async repositoryAll(): Promise<Task[]> {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
  }

  async repositoryCreate(task: Task): Promise<Task> {
    const result = await pool.query(
      "INSERT INTO tasks(title, description, status) VALUES($1, $2, $3) RETURNING *",
      [task.title, task.description, task.status],
    );
    return result.rows[0];
  }

  async repositoryGetById(id: number): Promise<Task | null> {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async repositoryUpdate(
    id: number,
    task: Partial<Task>,
  ): Promise<Task | null> {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status)
       WHERE id = $4
       RETURNING *`,
      [task.title, task.description, task.status, id],
    );
    return result.rows[0] || null;
  }

  async repositoryDelete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

import pool from "../config/db.js";

class TaskRepository {
  static async findAll({ page = 1, limit = 10, status } = {}) {
    const offset = (page - 1) * limit;
    const conditions = [];
    const values = [];

    if (status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(status);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await pool.query(
      `SELECT * FROM tasks ${where} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset],
    );

    const count = await pool.query(
      `SELECT COUNT(*) FROM tasks ${where}`,
      values,
    );

    return {
      data: result.rows,
      total: parseInt(count.rows[0].count),
      page,
      limit,
    };
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const columns = keys.join(",");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
    const result = await pool.query(
      `INSERT INTO tasks(${columns}) VALUES(${placeholders}) RETURNING *`,
      values,
    );
    return result.rows[0];
  }

  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(",");
    const result = await pool.query(
      `UPDATE tasks SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    return result.rowCount;
  }
}

export default TaskRepository;

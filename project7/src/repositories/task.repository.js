import pool from "../config/db.js";

class TaskRepository {
  static async findAll() {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const column = keys.join(",");
    const placeholder = keys.map((_, i) => `$${i + 1}`).join(",");

    console.log("keys: " + keys);
    console.log("values: " + values);

    console.log("column: " + column);
    console.log("placeholder: " + placeholder);

    const result = await pool.query(
      `INSERT INTO tasks(${column}) VALUES(${placeholder}) RETURNING *`,
      values,
    );

    console.log("result: ", result);

    return result.rows[0];
  }
}

export default TaskRepository;

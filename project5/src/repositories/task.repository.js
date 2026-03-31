const pool = require("../config/db");

class TaskRepository {
  async findAll() {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(fields) {
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

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");

    const result = await pool.query(
      `UPDATE tasks SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id],
    );

    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);

    return result.rowCount;
  }
}

module.exports = new TaskRepository();

import pool from "../config/config.js";

export class UserRepository {
  async getAll() {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(fields) {
    const keys = Object.keys(fields);
    const value = Object.values(fields);

    const columns = keys.join(",");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");

    const result = await pool.query(
      `INSERT INTO users(${columns}) VALUES(${placeholders}) RETURNING *`,
      value,
    );
    return result.rows[0];
  }

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setString = keys.map((k, i) => `${k}=$${i + 1}`).join(",");

    const result = await pool.query(
      `UPDATE users SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }
}

export const userRepo = new UserRepository();

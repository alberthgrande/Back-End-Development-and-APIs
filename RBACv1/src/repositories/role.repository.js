import { pool } from "../config/db.js";

export const createRole = async (name) => {
  const { rows } = await pool.query(
    `INSERT INTO roles (name) VALUES ($1) RETURNING *`,
    [name],
  );

  return rows[0];
};

export const findByName = async (name) => {
  const { rows } = await pool.query(`SELECT * FROM roles WHERE name = $1`, [
    name,
  ]);

  return rows[0];
};

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

export const updateRole = async (id, name) => {
  const { rows } = await pool.query(
    `UPDATE roles SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id],
  );

  return rows[0];
};

export const deleteRole = async (id) => {
  await pool.query(`UPDATE users SET role_id = NULL WHERE role_id = $1`, [id]);
  await pool.query(`DELETE FROM roles WHERE id = $1`, [id]);
};

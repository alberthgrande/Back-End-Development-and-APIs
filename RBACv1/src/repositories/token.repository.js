import { pool } from "../config/db.js";

export const saveToken = async (user_id, token) => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token)
     VALUES ($1, $2)`,
    [user_id, token],
  );
};

export const findToken = async (token) => {
  const { rows } = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [token],
  );
  return rows[0];
};

export const deleteToken = async (token) => {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
};

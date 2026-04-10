import { pool } from "../config/db.js";

export const saveToken = async (user_id, token) => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) RETURNING *`,
    [user_id, token],
  );
};

import { pool } from "../config/db.js";

// CREATE USER
export const createUser = async (email, password) => {
  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email`,
    [email, password],
  );

  return result.rows[0];
};

// FIND BY EMAIL
export const findByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
};

// FIND BY ID
export const findById = async (id) => {
  const result = await pool.query(`SELECT id, email FROM users WHERE id = $1`, [
    id,
  ]);

  return result.rows[0];
};

// UPDATE PASSWORD
export const updatePassword = async (userId, hashedPassword) => {
  await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [
    hashedPassword,
    userId,
  ]);
};

// GET ALL USERS
export const findAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, email FROM users ORDER BY id ASC`,
  );

  return result.rows;
};

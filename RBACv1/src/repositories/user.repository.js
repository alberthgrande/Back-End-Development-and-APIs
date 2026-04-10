import { pool } from "../config/db.js";

export const createUser = async (user) => {
  const query = `
    INSERT INTO users (name, email, password, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

  const values = [user.name, user.email, user.password, user.role_id];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const findByEmail = async (email) => {
  const { rows } = await pool.query(
    `
        SELECT u.*, r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE email = $1`,
    [email],
  );

  return rows[0];
};

export const findAll = async () => {
  const { rows } = await pool.query(`
        SELECT u.id, u.name, u.email, r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id`);

  return rows;
};

export const updateUser = async (id, data) => {
  const { rows } = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, role_id = $3
     WHERE id = $4
     RETURNING *`,
    [data.name, data.email, data.role_id, id],
  );

  return rows[0];
};

export const deleteUser = async (id) => {
  await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
};

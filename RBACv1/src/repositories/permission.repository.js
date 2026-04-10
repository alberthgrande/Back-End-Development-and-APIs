import { pool } from "../config/db.js";

export const createPermission = async (name) => {
  const { rows } = await pool.query(
    "INSERT INTO permissions (name) VALUES ($1) RETURNING *",
    [name],
  );
  return rows[0];
};

export const assignPermissionToRole = async (role_id, permission_id) => {
  await pool.query(
    `INSERT INTO role_permissions (role_id, permission_id)
     VALUES ($1, $2)`,
    [role_id, permission_id],
  );
};

export const getPermissionsByUserId = async (user_id) => {
  const { rows } = await pool.query(
    `SELECT p.name
     FROM users u
     JOIN roles r ON u.role_id = r.id
     JOIN role_permissions rp ON rp.role_id = r.id
     JOIN permissions p ON p.id = rp.permission_id
     WHERE u.id = $1`,
    [user_id],
  );

  return rows.map((r) => r.name);
};

export const updatePermission = async (id, name) => {
  const { rows } = await pool.query(
    `UPDATE permissions SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id],
  );

  return rows[0];
};

export const deletePermission = async (id) => {
  await pool.query(`DELETE FROM role_permissions WHERE permission_id = $1`, [
    id,
  ]);
  await pool.query(`DELETE FROM permissions WHERE id = $1`, [id]);
};

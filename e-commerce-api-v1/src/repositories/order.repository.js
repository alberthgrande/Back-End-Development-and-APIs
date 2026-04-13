import { pool } from "../config/db.js";

export const createOrder = async (userId, totalPrice) => {
  const result = await pool.query(
    `
        INSERT INTO orders (user_id, total_price)
        VALUES ($1, $2)
        RETURNING *`,
    [userId, totalPrice],
  );

  return result.rows[0];
};

export const createOrderItem = async (orderId, productId, quantity) => {
  const result = await pool.query(
    `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [orderId, productId, quantity],
  );

  return result.rows[0];
};

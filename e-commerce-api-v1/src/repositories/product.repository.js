import { pool } from "../config/db.js";

export const getProductsRepository = async () => {
  const products = await pool.query(`SELECT * FROM products`);
  return products.rows;
};

export const createProductRepository = async (product) => {
  const { name, price, stock } = product;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (name, price, stock)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, price, stock],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getProductsByIdRepository = async (id) => {
  const product = await pool.query(
    `
    SELECT * FROM products WHERE id = $1
    `,
    [id],
  );

  return product.rows[0];
};

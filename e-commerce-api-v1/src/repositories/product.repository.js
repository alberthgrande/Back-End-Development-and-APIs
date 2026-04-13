import { pool } from "../config/db.js";

export const getProducts = async () => {
  const products = await pool.query(`SELECT * FROM products`);
  return products.rows;
};

export const createProduct = async (product) => {
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

export const getProductById = async (id) => {
  const product = await pool.query(
    `
    SELECT * FROM products WHERE id = $1
    `,
    [id],
  );

  return product.rows[0];
};

export const updateProduct = async (id, products) => {
  const { name, price, stock } = products;

  const result = await pool.query(
    `
    UPDATE products 
    SET name=$1, price=$2, stock=$3 
    WHERE id=$4
    RETURNING *
    `,
    [name, price, stock, id],
  );

  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const product = await pool.query(
    `
    DELETE FROM products WHERE id = $1 RETURNING *
    `,
    [id],
  );

  return product.rows[0];
};

export const updateStock = async (productId, newStock) => {
  await pool.query(
    `
    UPDATE products SET stock = $1 WHERE id = $2
    RETURNING *`,
    [newStock, productId],
  );
};

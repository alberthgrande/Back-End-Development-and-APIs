import * as productRepository from "../repositories/product.repository.js";

// Get all products
export const getProducts = async () => {
  return await productRepository.getProducts();
};

// Create a new product
export const createProduct = async (product) => {
  if (product.price < 0 || product.stock < 0) {
    const error = new Error("Price and stock must be non-negative");
    error.status = 400;
    throw error;
  }

  return await productRepository.createProduct(product);
};

// Get product by ID, with existence check
export const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);

  if (!product) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  return product;
};

// Update product, with existence check
export const updateProduct = async (id, products) => {
  const { name, price, stock } = products;

  if (!name || price == null || stock == null) {
    const error = new Error("Missing required fields: name, price, stock");
    error.status = 400;
    throw error;
  }

  // Optional: stricter validation
  if (typeof name !== "string") {
    const error = new Error("Name must be a string");
    error.status = 400;
    throw error;
  }

  if (typeof price !== "number" || price < 0) {
    const error = new Error("Price must be a non-negative number");
    error.status = 400;
    throw error;
  }

  if (!Number.isInteger(stock) || stock < 0) {
    const error = new Error("Stock must be a non-negative integer");
    error.status = 400;
    throw error;
  }

  const product = await productRepository.updateProduct(id, products);

  if (!product) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  return product;
};

// Delete product
export const deleteProduct = async (id) => {
  const product = await productRepository.deleteProduct(id);

  if (!product) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  return product;
};

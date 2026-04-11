import * as productRepository from "../repositories/product.repository.js";

// Get all products
export const getProductsService = async () => {
  return await productRepository.getProductsRepository();
};

// Create a new product
export const createProductService = async (product) => {
  if (product.price < 0 || product.stock < 0) {
    const error = new Error("Price and stock must be non-negative");
    error.status = 400;
    throw error;
  }

  return await productRepository.createProductRepository(product);
};

// Get product by ID, with existence check
export const getProductsByIdService = async (id) => {
  const product = await productRepository.getProductsByIdRepository(id);

  if (!product) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  return product;
};

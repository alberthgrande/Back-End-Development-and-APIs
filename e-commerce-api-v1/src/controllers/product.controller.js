import * as productService from "../services/product.service.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({
      success: true,
      data: products,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

// Create a product
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to updated product",
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productService.deleteProduct(id);

    res.status(200).json({
      success: true,
      data: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};

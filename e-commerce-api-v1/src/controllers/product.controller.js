import * as productService from "../services/product.service.js";

// Get all products
export const getProductsController = async (req, res) => {
  try {
    const products = await productService.getProductsService();
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
export const createProductController = async (req, res) => {
  try {
    const product = await productService.createProductService(req.body);
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
export const getProductsByIdController = async (req, res) => {
  try {
    const product = await productService.getProductsByIdService(req.params.id);
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
export const updateProductsController = async (req, res) => {
  try {
    const product = await productService.updateProductsService(
      req.params.id,
      req.body,
    );

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
export const deleteProductsController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productService.deleteProductsService(id);

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

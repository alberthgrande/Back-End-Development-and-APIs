import * as productRepo from "../repositories/product.repository.js";
import * as orderRepo from "../repositories/order.repository.js";

export const createOrder = async (userId, items) => {
  let totalPrice = 0;

  // validate the product + calculate the total
  for (const item of items) {
    const product = await productRepo.getProductById(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    totalPrice += product.price * item.quantity;
  }

  // create order
  const order = await orderRepo.createOrder(userId, totalPrice);

  // create order items + update stock
  for (const item of items) {
    const product = await productRepo.getProductById(item.productId);

    await orderRepo.createOrderItem(order.id, item.productId, item.quantity);

    await productRepo.updateStock(
      item.productId,
      product.stock - item.quantity,
    );
  }

  return order;
};

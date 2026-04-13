import * as orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware
    const { items } = req.body;

    const order = await orderService.createOrder(userId, items);

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

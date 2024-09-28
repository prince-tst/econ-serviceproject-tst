const orderService = require('./orderService');
const createOrder = async (req, res, next) => {
  try {
    const { productId, quantity, paymentMethod } = req.body;
    const userId = req.userId;

    const result = await orderService.createOrder(userId, productId, quantity, paymentMethod);

    res.status(201).json({
      message: "Order and payment created successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrdersByUser(req.userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const result = await orderService.deleteOrderById(orderId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
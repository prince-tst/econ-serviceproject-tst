const paymentModel = require("../payment/paymentModel");
const productModel = require("../product/productModel");
const trasactionModel = require("../transaction/transactionModel");
const orderItemsModel = require("./orderItemsModel");
const orderModel = require("./orderModel");
const { sequelize } = require("../config/dbConnect");
// Create a new order

const createOrder = async (userId, productId, quantity, paymentMethod) => {
    const transaction = await sequelize.transaction();
    try {
      const product = await productModel.findByPk(productId);
      if (!product) throw new Error("Product not found");
  
      const totalPrice = Number(product.price) * Number(quantity);
  
      const order = await orderModel.create({
        totalAmount: totalPrice,
        status: "Pending",
        userId,
      }, { transaction });
  
      const orderItem = await orderItemsModel.create({
        orderId: order.id,
        productId: product.id,
        quantity,
        price: product.price,
      }, { transaction });
  
      const payment = await paymentModel.create({
        orderId: order.id,
        method: paymentMethod,
        status: "Pending",
        amount: totalPrice,
      }, { transaction });
  
      await transaction.commit();
  
      return { order, payment, orderItem };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  
  // Get all orders for a user
  const getOrdersByUser = async (userId) => {
    const orders = await orderModel.findAll({
      where: { userId },
      include: [{ model: orderItemsModel }],
    });
    if (!orders) throw new Error("No orders found");
    return orders;
  };
  
  // Update an order's status
  const updateOrderStatus = async (orderId, status) => {
    const order = await orderModel.findByPk(orderId);
    if (!order) throw new Error("Order not found");
  
    order.status = status;
    await order.save();
  
    return order;
  };
  
  // Delete an order by ID
  const deleteOrderById = async (orderId) => {
    const order = await orderModel.findByPk(orderId);
    if (!order) throw new Error("Order not found");
  
    await order.destroy();
    return { message: "Order deleted successfully" };
  };
  
  module.exports = {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
    deleteOrderById,
  };
const orderItemsModel = require("./orderItemsModel");
const orderModel = require("./orderModel");
const paymentModel = require("../payment/paymentModel");
const productModel = require("../product/productModel");
const { sequelize } = require("../config/dbConnect");
const createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    //console.log(req.body);
    const { productId, quantity, paymentMethod } = req.body;

    // Fetch product details from the database
    const product = await productModel.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate total price
    const totalPrice = Number(product.price) * Number(quantity);

    // Create a new order
    const order = await orderModel.create(
      {
        totalAmount: totalPrice,
        status: "Pending",
        userId: req.userId,
      },
      { transaction }
    );

    // Create order items
    const orderItem = await orderItemsModel.create(
      {
        orderId: order.id,
        productId: product.id,
        quantity: quantity,
        price: product.price,
      },
      { transaction }
    );

    // Create payment for the order
    const payment = await paymentModel.create(
      {
        orderId: order.id,
        method: paymentMethod,
        status: "Pending",
        amount: totalPrice,
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({
      message: "Order and payment created successfully",
      order,
      payment,
      orderItem,
    });
  } catch (error) {
    await transaction.rollback(); // Rollback transaction in case of error
    next(error);
  }
};
// Get all orders for the authenticated user
const getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.findAll({
      where: { userId: req.userId },
      include: [{ model: orderItemsModel }],
    });
    if (!orders) {
      next(new createHttpError(401, "No orders found"));
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    // const { orderId } = req.params;
    const { orderId, status } = req.body;

    // Find the order by ID
    const order = await orderModel.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order
    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by ID
    const order = await orderModel.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete the order
    await order.destroy();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
module.exports = { createOrder, getOrders, updateOrder, deleteOrder };

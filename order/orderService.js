const paymentModel = require("../payment/paymentModel");
const productModel = require("../product/productModel");
const orderItemsModel = require("./orderItemsModel");
const orderModel = require("./orderModel");
const { sequelize } = require("../config/dbConnect");
// Create a new order

const createOrder = async (userId, productId, quantity, paymentMethod) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await productModel.findByPk(productId);
    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Product is out of stock. Available stock: ${product.stock}`,
      });
    }
    const totalPrice = Number(product.price) * Number(quantity);

    const order = await orderModel.create(
      {
        totalAmount: totalPrice,
        status: "Pending",
        userId,
      },
      { transaction }
    );

    const orderItem = await orderItemsModel.create(
      {
        orderId: order.id,
        productId: product.id,
        quantity,
        price: product.price,
      },
      { transaction }
    );

    const payment = await paymentModel.create(
      {
        orderId: order.id,
        method: paymentMethod,
        status: "Pending",
        amount: totalPrice,
      },
      { transaction }
    );
    product.stock -= quantity;
    await product.save();
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

const updateOrderItemStatus = async (orderId, status) => {
  const order = await orderItemsModel.findByPk(orderId);
  if (!order) throw new Error("Order Item not found");

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
// const hasUserOrderedProduct = async (userId, productId) => {
//   const order = await orderModel.findOne({
//     where: { userId, status: 'completed' }, // Check only completed orders
//     include: [{
//       model: orderItemsModel,
//       where: { productId },
//     }],
//   });

//   // return !!order; // Returns true if an order exists, otherwise false
//   if (!order) {

//   } else {

//   }
// };
module.exports = {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
  updateOrderItemStatus,
  deleteOrderById,
};

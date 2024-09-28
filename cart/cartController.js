let flag = 0;
const cartItemsModel = require("./cartItemsModel");
const cartModel = require("./cartModel");
const productModel = require("../product/productModel");
const orderModel = require("../order/orderModel");
const orderItemsModel = require("../order/orderItemsModel");
const { sequelize } = require("../config/dbConnect");
const cartServices = require("./cartServices");
const getOrCreateCart = async (req, res, next) => {
  try {
    const cart = await cartServices.getOrCreateCart(req.userId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await cartServices.addItemToCart(
      req.userId,
      productId,
      quantity
    );
    flag = 0;
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    next(error);
  }
};
const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await cartItemsModel.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(201).json({ message: "Cart item updated" });
  } catch (error) {
    next(error);
  }
};
const removeItemFromCart = async (req, res, next) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await cartItemsModel.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.quantity = cartItem.quantity - Number(quantity);
    // await cartItem.destroy();
    if (cartItem.quantity <= 0) {
      await cartItem.destroy(); // Optionally, you can destroy the item if quantity reaches 0
      return res.json({ message: "Item removed from cart" });
    } else {
      await cartItem.save();
      return res.json({
        message: "Cart item quantity decreased",
        item: cartItem,
      });
    }
  } catch (error) {
    next(error);
  }
};
const clearCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await cartModel.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cartItemsModel.destroy({ where: { cartId: cart.id } });

    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
const checkout = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.userId;
    // Fetch the user's cart with items and related product data
    const cart = await cartModel.findOne({
      where: { userId },
      include: [
        {
          model: cartItemsModel,
          as: "items",
          include: [
            {
              model: productModel,
              as: "product",
              attributes: ["id", "price", "stock"],
            },
          ],
        },
      ],
    });

    if (!cart || cart.items.length === 0) {
      throw createError(400, "Your cart is empty");
    }

    // Create a new order
    const order = await orderModel.create(
      {
        totalAmount: 0,
        status: "Pending",
        userId: req.userId,
      },
      { transaction }
    );

    let totalAmount = 0;

    // Loop through each cart item to create order items and update product stock
    for (const item of cart.items) {
      const product = item.product;
      // Create the order item
      await orderItemsModel.create(
        {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        },
        { transaction }
      );

      // Calculate total order amount
      totalAmount += Number(product.price) * Number(item.quantity);
      await product.save({ transaction });
    }

    // Update the order with the correct total amount
    order.totalAmount = totalAmount;
    await order.save({ transaction });
    // Commit the transaction
    await transaction.commit();

    //Updated Flag Value TODO:Discuss with Jay Bhai
    await cartItemsModel.update(
      { isOrdered: true }, // set isOrdered to true
      { where: { userId: req.userid, isOrdered: false } } // filter by user and non-ordered items
    );

    return res.status(200).json({ message: "Checkout successful", order });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

module.exports = {
  getOrCreateCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  checkout,
};

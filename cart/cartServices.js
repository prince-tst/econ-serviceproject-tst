const cartItemsModel = require("./cartItemsModel");
const cartModel = require("./cartModel");
const productModel = require("../product/productModel");
const getOrCreateCart = async (userId) => {
  let cart = await cartModel.findOne({
    where: { userId },
    include: [
      {
        model: cartItemsModel,
        as: "items",
        include: [
          {
            model: productModel,
            attributes: ["id", "productName", "price"], // Include desired product attributes
            order: [["id", "DESC"]],
          },
        ],
        order: [["id", "DESC"]],
      },
    ],
  });
  if (!cart) {
    cart = await cartModel.create({ userId });
  }

  // Calculate the total price
  let totalPrice = 0;

  cart.items.forEach((item) => {
    const itemTotal = item.quantity * parseFloat(item.product.price);
    totalPrice += itemTotal;
  });
  //SORTING LOGIC BY CHAT GPT TODO: Discuss with jay bhai
  if (cart.items && cart.items.length > 0) {
    cart.items.sort((a, b) => b.id - a.id);
  }
  return { cart, totalPrice };
};
const addItemToCart = async (userId, productId, quantity) => {
  let cart = await cartModel.findOne({ where: { userId } });

  // Create a new cart if it doesn't exist
  if (!cart) {
    cart = await cartModel.create({ userId });
  }

  // Check if the cart item already exists for this product
  let cartItem = await cartItemsModel.findOne({
    where: { cartId: cart.id, productId },
  });

  if (cartItem) {
    // Update the quantity of the existing cart item
    cartItem.quantity += Number(quantity);
    await cartItem.save(); // Save the updated cart item
  } else {
    // Create a new cart item if it doesn't exist
    cartItem = await cartItemsModel.create({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  // Fetch the updated cart including items and product details
  cart = await cartModel.findOne({
    where: { userId },
    include: [
      {
        model: cartItemsModel,
        as: "items",
        include: [
          {
            model: productModel,
            attributes: ["id", "productName", "price"], // Include product details
          },
        ],
      },
    ],
  });

  // Sort items by id in descending order
  if (cart.items && cart.items.length > 0) {
    cart.items.sort((a, b) => b.id - a.id);
  }

  // Calculate the total price
  let totalPrice = 0;

  cart.items.forEach((item) => {
    const itemTotal = item.quantity * parseFloat(item.product.price);
    totalPrice += itemTotal;
  });

  return { cart, totalPrice };
};
module.exports = { getOrCreateCart, addItemToCart };

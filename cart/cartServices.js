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
  return {cart,totalPrice};
};
const addItemToCart = async (userId, productId, quantity) => {
  let cart = await cartModel.findOne({ where: { userId } });

  if (!cart) {
    cart = await cartModel.create({ userId });
  }

  let cartItem = await cartItemsModel.findOne({
    where: { cartId: cart.id, productId },
  });

  // Create a new cart item with a new id when updating quantity
  if (cartItem) {
    // Create a new entry for the updated quantity
    const newQuantity = cartItem.quantity + Number(quantity);
    cartItem = await cartItemsModel.create({
      cartId: cart.id,
      productId,
      quantity: newQuantity,
    });
  } else {
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

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
        where: { flag: false }, //flag condition
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
  //SORTING LOGIC BY CHAT GPT TODO: Discuss with jay bhai
  if (cart.items && cart.items.length > 0) {
    cart.items.sort((a, b) => b.id - a.id);
    cart.items.forEach((item) => {
      const itemTotal = item.quantity * parseFloat(item.product.price);
      totalPrice += itemTotal;
    });
  }
  return { cart, totalPrice };
};
const addItemToCart = async (userId, productId, quantity) => {
  // Find the cart for the user, including non-ordered items (flag: false)
  let cart = await cartModel.findOne({
    where: { userId },
    include: [
      {
        model: cartItemsModel,
        as: "items",
        where: { flag: false }, // Ensure only active items are included
        include: [
          {
            model: productModel,
            as: "product",
            attributes: ["id", "productName", "price"], // Fetch product attributes
          },
        ],
      },
    ],
  });

  // Create a new cart if one doesn't exist
  if (!cart) {
    cart = await cartModel.create({ userId });
  }

  // Check if the item already exists in the cart
  let cartItem = await cartItemsModel.findOne({
    where: { cartId: cart.id, productId },
  });

  // Update the quantity if the item exists, otherwise create a new cart item
  if (cartItem) {
    cartItem.quantity += Number(quantity); // Increase quantity
    await cartItem.save();
  } else {
    cartItem = await cartItemsModel.create({
      cartId: cart.id,
      productId,
      quantity,
      flag: false, // Ensure new items are active
    });
  }

  // Fetch the updated cart with the newly added items and product details
  cart = await cartModel.findOne({
    where: { userId },
    include: [
      {
        model: cartItemsModel,
        as: "items",
        where: { flag: false }, // Ensure only active items are included
        include: [
          {
            model: productModel,
            as: "product",
            attributes: ["id", "productName", "price"], // Include product details
          },
        ],
      },
    ],
  });

  // Calculate total price of the cart
  let totalPrice = 0;
  if (cart.items && cart.items.length > 0) {
    // Sort items by ID in descending order
    cart.items.sort((a, b) => b.id - a.id);

    // Calculate the total price based on quantity and price
    cart.items.forEach((item) => {
      const itemTotal = item.quantity * parseFloat(item.product.price);
      totalPrice += itemTotal;
    });
  }

  // Return the updated cart and total price
  return { cart, totalPrice };
};
module.exports = { getOrCreateCart, addItemToCart };

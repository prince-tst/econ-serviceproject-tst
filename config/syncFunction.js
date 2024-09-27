const userModel = require("../user/userModel");
const productModel = require("../product/productModel");
const categoryModel = require("../category/categoryModel");
const cartModel = require("../cart/cartModel");
const cartItemModel = require("../cart/cartItemsModel");
const { dbConnection } = require("./dbConnect");
const trasactionModel = require("../transaction/transactionModel");
const orderModel = require("../order/orderModel");
const orderItemsModel = require("../order/orderItemsModel");
const paymentModel = require("../payment/paymentModel");
const syncModels = async (req, res, next) => {
  try {
    dbConnection();
    await categoryModel.sync({ force: false });
    console.log("Category model synchronized.");

    await userModel.sync({ force: false });
    console.log("User model synchronized.");

    await productModel.sync({ force: false });
    console.log("Product model synchronized.");

    await cartModel.sync({ force: false });
    console.log("Cart model synchronized.");

    await cartItemModel.sync({ force: false });
    console.log("CartItem model synchronized.");

    await paymentModel.sync({ force: false });
    console.log("Payment model synchronized");

    await trasactionModel.sync({ force: false });
    console.log("Transaction model synchronized.");

    await orderModel.sync({ force: false });
    console.log("Order model synchronized.");

    await orderItemsModel.sync({ force: false });
    console.log("OrderItems model synchronized.");

    console.log("All models were synchronized successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = syncModels;

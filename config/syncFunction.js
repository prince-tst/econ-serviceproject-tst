const userModel = require("../user/userModel");
const productModel = require("../product/productModel");
const categoryModel = require("../category/categoryModel");
const cartModel = require("../cart/cartModel");
const cartItemsModel = require("../cart/cartItemsModel");
const { dbConnection, sequelize } = require("./dbConnect");
const transactionModel = require("../transaction/transactionModel");
const orderModel = require("../order/orderModel");
const orderItemsModel = require("../order/orderItemsModel");
const paymentModel = require("../payment/paymentModel");
const review = require("../review & rating/reviewModel");
const syncModels = async () => {
  try {
    await userModel.sync({ force: false });
    console.log("User model synchronized.");

    await categoryModel.sync({ force: false });
    console.log("Category model synchronized.");

    await productModel.sync({ force: false });
    console.log("Product model synchronized.");

    await cartModel.sync({ force: false });
    console.log("Cart model synchronized.");

    await cartItemsModel.sync({ force: false });
    console.log("CartItem model synchronized.");

    await paymentModel.sync({ force: false });
    console.log("Payment model synchronized");

    await transactionModel.sync({ force: false });
    console.log("Transaction model synchronized.");

    await orderModel.sync({ force: false });
    console.log("Order model synchronized.");

    await orderItemsModel.sync({ force: false });
    console.log("OrderItems model synchronized.");

    await review.sync({ force: false });
    console.log("rating and review model synchronized.");

    console.log("All models and associations have been successfully applied.");
  } catch (error) {
    console.log("error on database", error);
  }
};
module.exports = syncModels;

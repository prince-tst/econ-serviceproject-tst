const userModel = require("../user/userModel");
const productModel = require("../product/productModel");
const categoryModel = require("../category/categoryModel");
const cartModel = require("../cart/cartModel");
const cartItemsModel = require("../cart/cartItemsModel");
const { dbConnection } = require("./dbConnect");
const transactionModel = require("../transaction/transactionModel");
const orderModel = require("../order/orderModel");
const orderItemsModel = require("../order/orderItemsModel");
const paymentModel = require("../payment/paymentModel");
const review = require("../review & rating/reviewModel");
const relations = async () => {
  dbConnection();
  userModel.hasMany(review, { as: "userReview", foreignKey: "userId" });
  review.belongsTo(userModel, { as: "user", foreignKey: "userId" });

  // User and Cart Associations
  userModel.hasMany(cartModel, { foreignKey: "userId" });
  cartModel.belongsTo(userModel, { foreignKey: "userId" });

  // Category and Product Associations
  categoryModel.hasMany(productModel, { foreignKey: "categoryId" });
  productModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

  // Product and Review Associations
  productModel.hasMany(review, {
    as: "productReviews",
    foreignKey: "productId",
  });
  review.belongsTo(productModel, { as: "product", foreignKey: "productId" });

  // Order and OrderItems Associations
  orderModel.hasMany(orderItemsModel, { foreignKey: "orderId" });
  orderItemsModel.belongsTo(orderModel, { foreignKey: "orderId" });

  // CartItems and OrderItems Associations
  cartItemsModel.hasOne(orderItemsModel, { foreignKey: "cartItemId" });
  orderItemsModel.belongsTo(cartItemsModel, { foreignKey: "cartItemId" });

  orderItemsModel.hasMany(review, {
    foreignKey: "orderItemId",
    as: "review",
  });
  review.belongsTo(orderItemsModel, {
    foreignKey: "orderItemId",
    as: "orderItem",
  });

  // User and Order Associations
  userModel.hasMany(orderModel, { foreignKey: "userId" });
  orderModel.belongsTo(userModel, { foreignKey: "userId" });

  // Transaction and Order Associations
  transactionModel.hasOne(orderModel, { foreignKey: "transactionId" });
  orderModel.belongsTo(transactionModel, { foreignKey: "transactionId" });

  // Cart and CartItems Associations
  cartModel.hasMany(cartItemsModel, { as: "items", foreignKey: "cartId" });
  cartItemsModel.belongsTo(cartModel, { foreignKey: "cartId" });

  // Product and CartItems Associations
  productModel.hasMany(cartItemsModel, { foreignKey: "productId" });
  cartItemsModel.belongsTo(productModel, { foreignKey: "productId" });
};
module.exports = relations;

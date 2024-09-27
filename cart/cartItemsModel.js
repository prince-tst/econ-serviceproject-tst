const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const cartModel = require("./cartModel");
const productModel = require("../product/productModel");
const cartItemsModel = sequelize.define(
  "cartItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
cartModel.hasMany(cartItemsModel, { as: "items" , foreignKey: "cartId" });
cartItemsModel.belongsTo(cartModel);
productModel.hasMany(cartItemsModel);
cartItemsModel.belongsTo(productModel);
module.exports = cartItemsModel;

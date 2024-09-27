const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const orderModel = require("./orderModel");
const cartItemsModel = require("../cart/cartItemsModel");

const orderItemsModel = sequelize.define("orderItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});
orderModel.hasMany(orderItemsModel);
orderItemsModel.belongsTo(orderModel);

cartItemsModel.hasOne(orderItemsModel);
orderItemsModel.belongsTo(cartItemsModel);
module.exports = orderItemsModel;

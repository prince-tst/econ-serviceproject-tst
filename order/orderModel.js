const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const userModel = require("../user/userModel");
const orderModel = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: userModel,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = orderModel;

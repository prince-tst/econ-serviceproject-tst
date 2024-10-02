const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const cartItemsModel = sequelize.define(
  "cartItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false }
);
module.exports = cartItemsModel;

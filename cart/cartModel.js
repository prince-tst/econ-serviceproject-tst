const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const userModel = require("../user/userModel");
const cartModel = sequelize.define("cart", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userModel,
      key: "id",
    },
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
// A cart belongs to a user
module.exports = cartModel;

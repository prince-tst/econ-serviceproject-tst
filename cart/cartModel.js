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
cartModel.belongsTo(userModel); // A cart belongs to a user
userModel.hasMany(cartModel);
module.exports = cartModel;

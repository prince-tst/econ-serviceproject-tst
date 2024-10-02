const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
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
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});
module.exports = orderItemsModel;

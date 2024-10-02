const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const transactionModel = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transactionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});
module.exports = transactionModel;

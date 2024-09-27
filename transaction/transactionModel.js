const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const userModel = require("../user/userModel");

const trasactionModel = sequelize.define("transaction", {
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
userModel.hasMany(trasactionModel);
trasactionModel.belongsTo(userModel);
module.exports = trasactionModel;

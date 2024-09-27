const { sequelize } = require("../config/dbConnect");
const { DataTypes } = require("sequelize");
const categoryModel = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = categoryModel;

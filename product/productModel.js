const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");
const categoryModel = require("../category/categoryModel");
const productModel = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
categoryModel.hasMany(productModel);
productModel.belongsTo(categoryModel);

module.exports = productModel;

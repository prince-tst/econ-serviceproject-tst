const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const review = sequelize.define("review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
module.exports = review;

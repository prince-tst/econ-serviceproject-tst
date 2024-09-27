const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

module.exports = UserModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowDuplicate: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    mobile: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // Roles: user, admin
    },
    address: DataTypes.STRING,
    token: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: () => {},
      afterCreate: () => {},
    },
  }
);

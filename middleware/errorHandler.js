const createError = require("http-errors");
const express = require("express");
const app = express();
const errorHandler = (err, req, res, next) => {
  if (!err) {
    err = createError(500, "An unexpected error occurred");
  }
  console.log("HEY", err);
  if (err.name === "ValidationError") {
    res.status(400).json({
      status: 400,
      message: "Validation error , Enter Required fields",
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      status: 400,
      message: "Enter unique fields",
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      status: 401,
      message: "Invalid token",
    });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({
      status: 401,
      message: "Token has expired",
    });
  } else if (err.name === "SequelizeEmptyResultError") {
    res.status(400).json({
      status: 400,
      message: "User Not Found",
    });
  } else {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
module.exports = errorHandler;

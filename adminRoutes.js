const express = require("express");
const router = express.Router();
const productRouts = require("./product/productRouts");
const categoryRouts = require("./category/categoryRouts");
const orderRouts = require("./order/orderRouts");
router.use("/categorys", categoryRouts);
router.use("/products", productRouts);
router.use("/order", orderRouts);
module.exports = router;
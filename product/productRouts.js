const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./productController");
const { productSchema, updateProductSchema } = require("./productSchema");
const validateRequest = require("../middleware/validationMiddleware");
router.post(
  "/addproduct",
  authenticateJWT(["admin"]),
  validateRequest(productSchema),
  addProduct
);
router.get("/getproducts", getProducts);
//router.patch("/updateproduct", updateProduct);
router.delete("/deleteproduct", authenticateJWT(["admin"]), deleteProduct);
module.exports = router;

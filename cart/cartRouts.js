const express = require("express");
const { authenticateJWT, authorizeRole } = require("../middleware/auth");
const router = express.Router();
const {
  getOrCreateCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  checkout,
} = require("./cartController");
const validateRequest = require("../middleware/validationMiddleware");
const {
  addItemSchema,
  updateQuantitySchema,
  removeItemSchema,
  clearCartSchema,
  checkoutSchema,
} = require("./cartSchema");
router.post("/get", authenticateJWT(), getOrCreateCart);
router.post(
  "/add",
  validateRequest(addItemSchema),
  authenticateJWT(),
  addItemToCart
);
router.patch(
  "/updateitemsquantity",
  validateRequest(updateQuantitySchema),
  authenticateJWT(),
  updateCartItemQuantity
);
router.delete(
  "/removeitem",
  validateRequest(removeItemSchema),
  authenticateJWT(),
  removeItemFromCart
);
router.delete("/clearcart", authenticateJWT(), clearCart);
router.post("/checkout", authenticateJWT(), checkout);
module.exports = router;

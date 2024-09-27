const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const {
  createUser,
  login,
  getMe,
  updateUser,
  deleteUser,
} = require("./userController");
const cartRouts = require("../cart/cartRouts");
const categoryRouts = require("../category/categoryRouts");
const { addUserSchema, editUserSchema } = require("./userSchema");
const validateRequest = require("../middleware/validationMiddleware");
// const orderRouts = require("./orderRouts");
const productRouts = require("../product/productRouts");
router.post("/signup", validateRequest(addUserSchema), createUser);
router.post("/login", login);
router.get("/getme", authenticateJWT(), getMe);
router.post(
  "/updateuser",
  authenticateJWT(),
  validateRequest(editUserSchema),
  updateUser
);
router.delete("/deleteuser", authenticateJWT(), deleteUser);
router.use("/category", categoryRouts);
router.use("/cart", cartRouts);
router.use("/products", productRouts);
// router.use("/order", orderRouts);
module.exports = router;

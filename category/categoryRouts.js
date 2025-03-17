const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("./categoryController");
const { categorySchema, updateCategorySchema } = require("./categorySchema");
const validateRequest = require("../middleware/validationMiddleware");
router.post(
  "/addcategory",
  authenticateJWT(["admin"]),
  validateRequest(categorySchema),
  addCategory
);
router.get("/getcategorys", getCategories);
router.post(
  "/updatecategory",
  authenticateJWT(["admin"]),
  validateRequest(updateCategorySchema),
  updateCategory
);
router.delete("/deletecategory", authenticateJWT(["admin"]), deleteCategory);
module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const reviewController = require("./reviewController");
router.post("/createreview", authenticateJWT(), reviewController.createReview);
router.get("/getreview", authenticateJWT(), reviewController.getReviews);
router.patch("/updatereview", authenticateJWT(), reviewController.updateReview);
router.delete(
  "/deletereview",
  authenticateJWT(["admin"]),
  reviewController.deleteReview
);
module.exports = router;

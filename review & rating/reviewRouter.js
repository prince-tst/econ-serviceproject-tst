const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const reviewController = require("./reviewController");
router.post("/createreview", authenticateJWT(), reviewController.createReview);
module.exports = router;

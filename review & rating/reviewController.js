const reviewService = require("./reviewServices");
const orderService = require("../order/orderService");

// Create a review
const createReview = async (req, res, next) => {
  const { productId, rating, comment, orderId } = req.body;
  const userId = req.userId; //auth
  try {
    const createdreview = reviewService.createReview(
      productId,
      rating,
      comment,
      orderId,
      userId
    );
    res.status(200).json(createdreview);
  } catch (error) {
    next(error);
  }
};

// Update a review
const updateReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const updatedReview = await reviewService.updateReview(
      reviewId,
      userId,
      req.body
    );
    if (!updatedReview) {
      return res.status(404).json({
        error:
          "Review not found or you do not have permission to update this review.",
      });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const deleted = await reviewService.deleteReview(reviewId, userId);
    if (!deleted) {
      return res.status(404).json({
        error:
          "Review not found or you do not have permission to delete this review.",
      });
    }
    res.status(204).json({ message: "deleted review" }); // No content to send back
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createReview, updateReview, deleteReview };

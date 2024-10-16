const reviewService = require("./reviewServices");
const orderService = require("../order/orderService");
const { message } = require("../order/orderSchema");

// Create a review
const createReview = async (req, res, next) => {
  const { productId, rating, comment, orderId } = req.body;
  const userId = req.userId; //auth
  try {
    const createdreview = await reviewService.createReview(
      productId,
      rating,
      comment,
      orderId,
      userId
    );
    res.status(200).json({ createdreview });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const reviews = await reviewService.getReviews(productId);
    res.status(200).json(reviews);
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
const deleteReview = async (req, res, next) => {
  const reviewId = req.body.reviewId;
  const userId = req.userId;

  try {
    const deleted = await reviewService.deleteReview(reviewId, userId);
    if (!deleted) {
      return res.status(404).json({
        error:
          "Review not found or you do not have permission to delete this review.",
      });
    }
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };

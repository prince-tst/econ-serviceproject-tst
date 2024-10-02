const { where } = require("sequelize");
const reviewModel = require("./reviewModel"); // Adjust the path as necessary
const orderItemsModel = require("../order/orderItemsModel");
const orderModel = require("../order/orderModel");
// Create a review
const createReview = async (productId, rating, comment, orderId, userId) => {
  const data = { productId, rating, comment, orderId, userId };
  const review = await reviewModel.create(data, {
    where: { userId, status: "Completed" }, // Check only completed orders
    include: [
      {
        model: orderItemsModel,
        as: "orderItem",
        where: { productId },
      },
    ],
  });
  return review;
};

// Update a review
const updateReview = async (reviewId, userId, data) => {
  const review = await reviewModel.findOne({ where: { id: reviewId, userId } });
  if (!review) return null; // Review not found or not owned by user

  return await review.update(data);
};

// Delete a review
const deleteReview = async (reviewId, userId) => {
  const review = await reviewModel.findOne({ where: { id: reviewId, userId } });
  if (!review) return null; // Review not found or not owned by user

  await review.destroy();
  return true; // Indicate successful deletion
};

module.exports = { createReview, updateReview, deleteReview };

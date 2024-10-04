const { where } = require("sequelize");
const reviewModel = require("./reviewModel"); // Adjust the path as necessary
const orderItemsModel = require("../order/orderItemsModel");
const orderModel = require("../order/orderModel");
const { json } = require("body-parser");
const userModel = require("../user/userModel");
const { sequelize } = require("../config/dbConnect");
// Create a review
const createReview = async (productId, rating, comment, orderId, userId) => {
  const data = { productId, rating, comment, orderId, userId };
  const review = await reviewModel.create(data, {
    where: { userId, status: "Complated" },
    include: [
      {
        model: orderItemsModel,
        as: "orderItem",
        where: { productId },
      },
    ],
  });
  return { review };
};

const getReviews = async (productId) => {
  try {
    const reviews = await reviewModel.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: ["userName"],
        },
      ],
    });
    const avgRating = await reviewModel.findOne({
      where: { productId },
      attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "avgRating"]],
      raw: true,
    });
    return { reviews, avgRating };
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve reviews");
  }
};
// Update a review
const updateReview = async (reviewId, userId, data) => {
  const review = await reviewModel.findOne({ where: { id: reviewId, userId } });
  if (!review) return null;

  return await review.update(data);
};

// Delete a review
const deleteReview = async (reviewId, userId) => {
  const review = await reviewModel.findOne({
    where: { id: reviewId, userId },
    logging: console.log,
  });
  if (!review) return null;

  await review.destroy();
  return true;
};

module.exports = { createReview, getReviews, updateReview, deleteReview };

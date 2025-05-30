const Joi = require("joi");

const createOrderSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  paymentMethod: Joi.string().valid("Credit Card", "PayPal", "Cash").required(),
});

module.exports = createOrderSchema;

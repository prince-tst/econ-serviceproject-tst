const Joi = require("joi");
const addItemSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});
const updateQuantitySchema = Joi.object({
  cartItemId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});
const removeItemSchema = Joi.object({
  cartItemId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});
module.exports = {
  addItemSchema,
  updateQuantitySchema,
  removeItemSchema,
};

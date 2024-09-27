const Joi = require("joi");
const productSchema = Joi.object({
  productName: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().positive().required(),
  categoryId: Joi.string().required(),
});
const updateProductSchema = Joi.object({
  productName: Joi.string().min(3).max(50),
  price: Joi.number().positive(),
  categoryId: Joi.string(),
});

module.exports = { productSchema, updateProductSchema };

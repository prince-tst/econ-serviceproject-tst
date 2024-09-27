const Joi = require("joi");

const categorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50).required(),
});

const updateCategorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(50),
});

module.exports = { categorySchema, updateCategorySchema };

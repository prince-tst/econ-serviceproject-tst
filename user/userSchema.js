const joi = require("joi");
const addUserSchema = joi.object({
  userPassword: joi.string().min(6).required(),
  userName: joi.string().required(),
  mobile: joi.string().required(),
  email: joi.string().required(),
  role: joi.string().required(),
  address: joi.string().required(),
  isActive: joi.boolean().default(true),
});
const editUserSchema = joi.object({
  userName: joi.string(),
  address: joi.string(),
  isActive: joi.boolean().default(true),
});
module.exports = {
  addUserSchema,
  editUserSchema,
};

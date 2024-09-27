const Joi = require("joi");
const errorHandler = require("../middleware/errorHandler");
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    } else {
      next();
    }
  };
};

module.exports = validateRequest;

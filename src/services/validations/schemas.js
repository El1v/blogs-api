const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  idSchema,
  addUserSchema,
};
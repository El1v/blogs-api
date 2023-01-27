const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const addCategorySchema = Joi.string().min(1).required();

const addPostSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(Joi.number()).min(1).required(),
});

module.exports = {
  idSchema,
  addUserSchema,
  addCategorySchema,
  addPostSchema,
};
const { addUserSchema, idSchema, addCategorySchema, addPostSchema, updatePostSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewUser = (displayName, email, password) => {
  const { error } = addUserSchema
    .validate({ displayName, email, password });
  
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateNewCategory = (name) => {
  const { error } = addCategorySchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: '"name" is required' };

  return { type: null, message: '' };
};

const validateNewPost = (title, content, categoryIds) => {
  const { error } = addPostSchema
  .validate({ title, content, categoryIds });

  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };

  return { type: null, message: '' };
};

const validateUpdatePost = (title, content) => {
  const { error } = updatePostSchema.validate({ title, content }); 

  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewUser,
  validateNewCategory,
  validateNewPost,
  validateUpdatePost,
};
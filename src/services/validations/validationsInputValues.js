const { addUserSchema, idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewUser = (displayName, email, password) => {
  const { error } = addUserSchema
    .validate({ displayName, email, password });

  console.log('error no validations:', error);
  
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewUser,
};
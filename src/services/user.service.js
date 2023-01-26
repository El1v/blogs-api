const validation = require('./validations/validationsInputValues');
const { generateToken } = require('../utils/JWT');

const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const error = validation.validateNewUser(displayName, email, password);

  if (error.type) return error;

  const userExists = await User.findOne({
    where: { email },
  });

  if (userExists) return { type: 'USER_EXISTS', message: 'User already registered' };

  const newUser = User.create({ displayName, email, password, image });
  console.log('new user id:', newUser);

  const token = generateToken(email);
  return { type: null, message: token };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
  });

  return users;
};
module.exports = { 
  createUser,
  getAllUsers,
};
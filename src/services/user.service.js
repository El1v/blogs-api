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

  const newUser = await User.create({ displayName, email, password, image });
  console.log('new user id:', newUser);

  console.log('email service', email);
  const token = generateToken({ email });
  return { type: null, message: token };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
  });

  return users;
};

const getByUserId = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
  });

  if (!user) return { type: 'USER_NOT_EXISTS', message: 'User does not exist' };
  return { type: null, message: user };
};

module.exports = { 
  createUser,
  getAllUsers,
  getByUserId,
};
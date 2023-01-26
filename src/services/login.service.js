const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const authenticate = async (email, password) => {
  if (!email || !password) {
 return { 
    type: 'INVALID_VALUE', message: 'Some required fields are missing', 
  }; 
}

  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) return { type: 'INVALID_VALUE', message: 'Invalid fields' };

  const token = generateToken(email);

  return { type: null, message: token };
};

module.exports = {
  authenticate,
};
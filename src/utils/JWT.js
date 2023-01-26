const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
};

const generateToken = ({ email }) => jwt.sign({ email }, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) {
    const error = new Error('Missing auth token');
    error.status = 401;
    throw error;
  }

  try {
    const decryptedData = await jwt.verify(token, TOKEN_SECRET);
    return decryptedData;
  } catch (error) {
    const err = new Error('jwt malformed');
    err.status = 401;
    throw err;
  }
};

module.exports = { 
  generateToken,
  authenticateToken,
};
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
};

const generateToken = ({ email }) => jwt.sign({ email }, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) {
    return { type: 'EMPTY_TOKEN', message: 'Token not found' };
  }

  try {
    const decryptedData = await jwt.verify(token, TOKEN_SECRET);
    return decryptedData;
  } catch (error) {
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }
};

const parseJwt = async (token) => {
  const email = await jwt.decode(token, TOKEN_SECRET);
  return email;
};

module.exports = { 
  generateToken,
  authenticateToken,
  parseJwt,
};
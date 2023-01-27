const { authenticateToken } = require('../utils/JWT');
const { mapError } = require('../utils/errorMap');

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const result = await authenticateToken(authorization);
  const { type, message } = result;
  if (type) return res.status(mapError(type)).json({ message });

  req.user = result.email;
  return next();
};

module.exports = authToken;
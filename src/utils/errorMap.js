const errorMap = {
  INVALID_VALUE: 400,
  USER_EXISTS: 409,
  EMPTY_TOKEN: 401,
  INVALID_TOKEN: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};

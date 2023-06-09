const errorMap = {
  INVALID_VALUE: 400,
  USER_EXISTS: 409,
  CATEGORY_EXISTS: 409,
  EMPTY_TOKEN: 401,
  INVALID_TOKEN: 401,
  USER_NOT_EXISTS: 404,
  CATEGORY_NOT_FOUND: 400,
  POST_NOT_EXISTS: 404,
  UNAUTHORIZED_USER: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};

import jwt from 'jsonwebtoken';
/**
 * @desc verifies token
 * @param {string} token jwt token
 * @returns {object} object
 */
const checkAuth = (token) => {
  if (!token) {
    return {
      userId: null
    };
  }
  const decoded = jwt.decode(token);
  if (decoded) {
    if (decoded.exp < Date.now() / 1000) {
      return {
        userId: null,
      };
    }
    return {
      userId: decoded.id
    };
  }
  return {
    userId: null
  };
};

export default checkAuth;


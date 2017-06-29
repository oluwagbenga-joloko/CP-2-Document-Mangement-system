import jwt from 'jsonwebtoken';

const checkAuth = (token) => {
  if (!token) {
    return {
      userId: null
    };
  } else if (token) {
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
  }
};

export default checkAuth;


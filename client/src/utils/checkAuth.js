import jwt from 'jsonwebtoken';

const token = window.localStorage.getItem('token');

const checkAuth = () => {
  if (!token) {
    return {
      success: false,
      user: null
    };
  } else if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if (decoded.exp < Date.now() / 1000) {
        return {
          success: false,
          user: null,
        };
      }
      return {
        success: true,
        user: decoded,
      };
    }
    return {
      success: false,
      user: null
    };
  }
};

export default checkAuth;


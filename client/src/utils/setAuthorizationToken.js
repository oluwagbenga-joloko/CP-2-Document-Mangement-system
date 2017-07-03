import axios from 'axios';
/**
 * @desc sets axios token
 * @param {string} token jwt token
 * @returns {null} no return value
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthorizationToken;

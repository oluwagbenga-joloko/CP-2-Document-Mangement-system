import axios from 'axios';
import actionTypes from './actionTypes';

const loginStatus = payload => ({
  type: actionTypes.LOGIN_STATUS, payload
});

const login = details => (dispatch) => {
  axios
  .post('/api/users/login', details)
  .then((res) => {
    localStorage.setItem('token', res.data.token);
    dispatch(loginStatus(res.data));
  })
  .catch((error) => {
    dispatch(loginStatus(error.response.data));
  });
};
export default login;

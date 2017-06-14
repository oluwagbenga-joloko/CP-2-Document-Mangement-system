import axios from 'axios';
import actionTypes from './actionTypes';
import setAtherizationToken from '../utils/setAuthorizationToken';

const loginFaliure = payload => ({
  type: actionTypes.LOGIN_FALUIRE, payload
});
const loginSuccess = payload => ({
  type: actionTypes.LOGIN_SUCCESS, payload
});
const login = details => dispatch => axios
  .post('/api/users/login', details)
  .then((res) => {
    setAtherizationToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    dispatch(loginSuccess(res.data));
  })
  .catch((error) => {
    dispatch(loginFaliure(error.response.data));
    throw (error);
  });

const signUpFaliure = payload => ({
  type: actionTypes.SIGN_UP_FALUIRE, payload
});
const signUpSuccess = payload => ({
  type: actionTypes.SIGN_UP_SUCCESS, payload
});
const signUp = details => dispatch => axios
  .post('/api/users', details)
  .then((res) => {
    setAtherizationToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    dispatch(signUpSuccess(res.data));
  })
  .catch((error) => {
    dispatch(signUpFaliure(error.response.data));
    throw (error);
  });

const logout = () => {
  window.localStorage.removeItem('token');
  return {
    type: actionTypes.LOG_OUT, payload: { success: false, user: null }
  };
};
export { logout, login, signUp };


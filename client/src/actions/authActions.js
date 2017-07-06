import axios from 'axios';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';
import setAtherizationToken from '../utils/setAuthorizationToken';
import checkAuth from '../utils/checkAuth';
/**
 * @desc loginfaluire action creator
 * @returns {object} action
 * @param {*} payload data
 */
const loginFaliure = payload => ({
  type: actionTypes.LOGIN_FALUIRE, payload
});
/**
 * @desc loginSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const loginSuccess = payload => ({
  type: actionTypes.LOGIN_SUCCESS, payload
});
/**
 * @desc login async action creator
 * @returns {Promise} action
 * @param {*} details data
 */
const login = details => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .post('/api/users/login', details)
  .then((res) => {
    setAtherizationToken(res.data.token);
    window.localStorage.setItem('token', res.data.token);
    dispatch(loginSuccess(checkAuth(res.data.token)));
  })
  .catch((error) => {
    dispatch(ajaxCallError());
    dispatch(loginFaliure(error.response.data));
    throw (error);
  });
};

/**
 * @desc signUpFaliure action creator
 * @param {*} payload data
 * @returns {object} action
 */
const signUpFaliure = payload => ({
  type: actionTypes.SIGN_UP_FALUIRE, payload
});
/**
 * @desc signUpSuccess
 * @param {*} payload data
 * @returns {object} action
 */
const signUpSuccess = payload => ({
  type: actionTypes.SIGN_UP_SUCCESS, payload
});
/**
 * @desc signUp async action creator
 * @param {*} details
 * @returns {Promise} action
 */
const signUp = details => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .post('/api/users', details)
  .then((res) => {
    setAtherizationToken(res.data.token);
    window.localStorage.setItem('token', res.data.token);
    const userId = checkAuth(res.data.token);
    dispatch(signUpSuccess(userId));
  })
  .catch((error) => {
    dispatch(ajaxCallError());
    dispatch(signUpFaliure(error.response.data));
    throw (error);
  });
};
/**
 * @desc logout action creator
 * @returns {object} action
 */
const logout = () => {
  window.localStorage.removeItem('token');
  return {
    type: actionTypes.LOG_OUT, payload: { userId: null }
  };
};
export { logout, login, signUp, loginSuccess,
   signUpSuccess, signUpFaliure, loginFaliure };


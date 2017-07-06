import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';
/**
 * @desc getCurrentUserSuccess action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const getCurrentUserSuccess = payload => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS, payload
});
/**
 * @desc async getCurrentUser action creator
 * @param {number} id userId
 * @returns {Object} action
 */
const getCurrentUser = id => dispatch => axios
.get(`api/users/${id}`)
.then((res) => {
  dispatch(getCurrentUserSuccess(res.data.user));
}).catch((error) => {
  throw error;
});
/**
 * @desc searchUserFailure action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const searchUserFailure = payload => ({
  type: actionTypes.SEARCH_USER_FAILURE, payload
});
/**
 * @desc searchUserSuccess action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const searchUserSuccess = payload => ({
  type: actionTypes.SEARCH_USER_SUCCESS, payload
});
/**
 * @desc async searchUser action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const searchUser = ({ query, offset, limit }) => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .get(`api/search/users/?q=${query}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    dispatch(searchUserSuccess(res.data));
  }).catch((err) => {
    dispatch(searchUserFailure());
    dispatch(ajaxCallError());
    throw (err);
  });
};
/**
 * @desc updateUser action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS
});
/**
 * @desc async searchUser action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const updateUser = payload => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .put(`api/users/${payload.userId}`, payload)
  .then((res) => {
    dispatch(updateUserSuccess());
    toastr.success(res.data.message);
  }).catch((err) => {
    toastr.error(err.response.data.message);
    dispatch(ajaxCallError());
    throw (err);
  });
};
/**
 * @desc deleteUserSuccess action creator
 * @param {*} payload data
 * @returns {Object} action
 */
const deleteUserSuccess = payload => ({
  type: actionTypes.DELETE_USER_SUCCESS, payload
});
/**
 * @desc deleteUser async action creator
 * @param {*} payload data
 * @returns {Promise} action
 */
const deleteUser = payload => dispatch => axios
 .delete(`api/users/${payload}`)
 .then((res) => {
   dispatch(deleteUserSuccess(res.data));
 }).catch((err) => {
   throw (err);
 });
export {
  getCurrentUserSuccess,
  getCurrentUser,
  deleteUser,
  deleteUserSuccess,
  searchUser,
  searchUserSuccess,
  searchUserFailure,
  updateUser
};


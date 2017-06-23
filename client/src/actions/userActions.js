import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

const getCurrentUserSuccess = payload => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS, payload
});
const getCurrentUser = id => dispatch => axios
.get(`api/users/${id}`)
.then((res) => {
  dispatch(getCurrentUserSuccess(res.data.user));
}).catch((error) => {
  throw error;
});
const searchUserSuccess = payload => ({
  type: actionTypes.SEARCH_USER_SUCCESS, payload
});

const searchUser = ({ query, offset, limit }) => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .get(`api/search/users/?q=${query}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    dispatch(searchUserSuccess(res.data));
  }).catch((err) => {
    dispatch(ajaxCallError());
    throw (err);
  });
};

const updateUser = payload => dispatch => axios
  .put(`api/users/${payload.userId}`, payload)
  .then((res) => {
    toastr.success(res.data.message);
    dispatch(getCurrentUser(payload.userId));
  }).catch((err) => {
    toastr.error(err.response.data.message);
    throw (err);
  });

const deleteUserSuccess = payload => ({
  type: actionTypes.DELETE_USER_SUCCESS, payload
});
const deleteUser = payload => dispatch => axios
 .delete(`api/users/${payload}`)
 .then((res) => {
   dispatch(deleteUserSuccess(res.data));
 }).catch((err) => {
   throw (err);
 });
export {
  getCurrentUser,
  deleteUser,
  searchUser,
  updateUser
};


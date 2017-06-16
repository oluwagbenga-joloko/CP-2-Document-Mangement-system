import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

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
const updateUserSuccess = payload => ({
  type: actionTypes.UPDATE_USER_SUCCESS, payload
});
const updateUser = payload => dispatch => axios
  .put(`api/users/${payload.userId}`, payload)
  .then((res) => {
    toastr.success(res.data.msg);
    dispatch(updateUserSuccess(res.data));
  }).catch((err) => {
    toastr.error(err.response.data.msg);
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
  deleteUser,
  searchUser,
  updateUser
};


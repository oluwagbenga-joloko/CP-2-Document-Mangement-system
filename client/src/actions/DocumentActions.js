import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';


const createDocumentSuccess = payload => ({
  type: actionTypes.CREATE_DOCUMENT_SUCCESS, payload
});
const createDocument = payload => dispatch => axios
  .post('/api/documents', payload)
  .then((res) => {
    toastr.success('document created successfully');
    dispatch(createDocumentSuccess(res.data));
  })
  .catch((err) => {
    toastr.error(err.response.data.message);
    throw (err);
  });

const getUserDocumentsSuccess = payload => ({
  type: actionTypes.GET_USER_DOCUMENTS_SUCCESS,
  payload
});
const getUserDocuments = ({ query, offset, limit, access }) => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .get(`api/search/userdocuments/?q=${query}&offset=${offset}&limit=${limit}&access=${access}`)
  .then((res) => {
    dispatch(getUserDocumentsSuccess(res.data));
  })
  .catch((err) => {
    dispatch(ajaxCallError());
    toastr.error(err.response.data.message);
    throw (err);
  });
};

const getDocumentSuccess = payload => ({
  type: actionTypes.GET_DOCUMENT_SUCCESS, payload
});

const getDocument = payload => dispatch => axios
  .get(`api/documents/${payload}`)
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((err) => {
    toastr.error(err.response.data.message);
    throw (err);
  });
const updateDocumentSuccess = payload => ({
  type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload
});

const updateDocument = payload => dispatch => axios
  .put(`api/documents/${payload.id}`, payload)
  .then((res) => {
    toastr.success(res.data.message);
    dispatch(updateDocumentSuccess(res.data));
  }).catch((err) => {
    toastr.error(err.response.data.message);
    throw (err);
  });

const deleteDocumentSuccess = payload => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
});

const deleteDocument = payload => dispatch => axios
 .delete(`api/documents/${payload}`)
 .then((res) => {
   toastr.success(res.data.message);
   dispatch(deleteDocumentSuccess(res.data));
 }).catch((err) => {
   toastr.error(err.response.data.message);
   throw (err);
 });
const searchDocumentsSuccess = payload => ({
  type: actionTypes.SEARCH_DOCUMENT_SUCCESS, payload
});

const searchDocuments = ({ query, offset, limit, access }) => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .get(`api/search/documents/?q=${query}&offset=${offset}&limit=${limit}&access=${access}`)
  .then((res) => {
    dispatch(searchDocumentsSuccess(res.data));
  });
};
export {
  createDocument,
  getUserDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
};


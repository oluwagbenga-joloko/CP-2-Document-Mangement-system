import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

/**
 * @desc createDocumentSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const createDocumentSuccess = payload => ({
  type: actionTypes.CREATE_DOCUMENT_SUCCESS, payload
});
/**
 * @desc async createDocument action creator
 * @returns {Promise} action
 * @param {*} payload data
 */
const createDocument = payload => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .post('/api/documents', payload)
  .then((res) => {
    toastr.success('document created successfully');
    dispatch(createDocumentSuccess(res.data));
  })
  .catch((err) => {
    dispatch(ajaxCallError());
    toastr.error(err.response.data.message);
    throw (err);
  });
};
/**
 * @desc gerUserDocumentSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const getUserDocumentsSuccess = payload => ({
  type: actionTypes.GET_USER_DOCUMENTS_SUCCESS,
  payload
});
/**
 * @desc getUserDocumentsFailure action creator
 * @returns {object} action
 * @param {*} payload data
 */
const getUserDocumentsFailure = () => ({
  type: actionTypes.GET_USER_DOCUMENTS_FAILURE,
});

/**
 * @desc  async getSuccess action creator
 * @returns {Promise} action
 * @param {*} payload data
 */
const getUserDocuments = ({ query, offset, limit, access }) => (dispatch) => {
  dispatch(beginAjaxCall());
  const queryString =
   `q=${query}&offset=${offset}&limit=${limit}&access=${access}`;
  return axios
  .get(`api/search/userdocuments/?${queryString}`)
  .then((res) => {
    dispatch(getUserDocumentsSuccess(res.data));
  })
  .catch((err) => {
    dispatch(getUserDocumentsFailure());
    dispatch(ajaxCallError());
    throw (err);
  });
};
/**
 * @desc gerDocumentSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const getDocumentSuccess = payload => ({
  type: actionTypes.GET_DOCUMENT_SUCCESS, payload
});

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const getDocument = payload => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .get(`api/documents/${payload}`)
  .then((res) => {
    dispatch(getDocumentSuccess(res.data.document));
  })
  .catch((err) => {
    dispatch(ajaxCallError());
    toastr.error(err.response.data.message);
    throw (err);
  });
};
/**
 * @desc updateDocuementSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const updateDocumentSuccess = payload => ({
  type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload
});

/**
 * @desc async updateDocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const updateDocument = payload => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
  .put(`api/documents/${payload.id}`, payload)
  .then((res) => {
    toastr.success(res.data.message);
    dispatch(updateDocumentSuccess(res.data.document));
  }).catch((err) => {
    toastr.error(err.response.data.message);
    dispatch(ajaxCallError());
    throw (err);
  });
};
/**
 * @desc deleteDocument action creator
 * @returns {object} action
 * @param {*} payload data
 */
const deleteDocumentSuccess = payload => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
});

/**
 * @desc deleteDocument async action creator
 * @returns {Promise} action
 * @param {*} payload data
 */
const deleteDocument = payload => dispatch => axios
 .delete(`api/documents/${payload}`)
 .then((res) => {
   toastr.success(res.data.message);
   dispatch(deleteDocumentSuccess(res.data));
 });
 /**
 * @desc searchDocumentSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const searchDocumentsSuccess = payload => ({
  type: actionTypes.SEARCH_DOCUMENT_SUCCESS, payload
});
/**
 * @desc searchDocumentsFailure action creator
 * @returns {object} action
 * @param {*} payload data
 */
const searchDocumentsFailure = () => ({
  type: actionTypes.SEARCH_DOCUMENT_FAILURE
});
/**
 * @desc searchDocuments async action creator
 * @returns {Promise} action
 * @param {*} payload data
 */
const searchDocuments = ({ query, offset, limit, access }) => (dispatch) => {
  dispatch(beginAjaxCall());
  const queryString =
  `q=${query}&offset=${offset}&limit=${limit}&access=${access}`;
  return axios
  .get(
    `api/search/documents/?${queryString}`
    )
  .then((res) => {
    dispatch(searchDocumentsSuccess(res.data));
  })
  .catch((err) => {
    dispatch(searchDocumentsFailure());
    dispatch(ajaxCallError());
    throw (err);
  });
};
export {
  createDocumentSuccess,
  createDocument,
  getUserDocumentsSuccess,
  getUserDocumentsFailure,
  getUserDocuments,
  getDocument,
  getDocumentSuccess,
  updateDocument,
  updateDocumentSuccess,
  deleteDocument,
  deleteDocumentSuccess,
  searchDocuments,
  searchDocumentsSuccess,
  searchDocumentsFailure
};


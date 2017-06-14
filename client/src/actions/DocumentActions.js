import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';


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
    toastr.error(err.response.data.msg);
    throw (err);
  });

const getMydocumentsSuccess = payload => ({
  type: actionTypes.GET_MY_DOCUMENTS_SUCCESS,
  payload
});
const getMydocuments = payload => dispatch => axios
  .get(`api/users/${payload}/documents`)
  .then((res) => {
    dispatch(getMydocumentsSuccess(res.data));
  })
  .catch((err) => {
    toastr.error(err.response.data.msg);
    throw (err);
  });

const getDocumentSuccess = payload => ({
  type: actionTypes.GET_DOCUMENT_SUCCESS, payload
});

const getDocument = payload => dispatch => axios
  .get(`api/documents/${payload}`)
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((err) => {
    toastr.error(err.response.data.msg);
    throw (err);
  });
const updateDocumentSuccess = payload => ({
  type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload
});

const updateDocument = payload => dispatch => axios
  .put(`api/documents/${payload.id}`, payload)
  .then((res) => {
    toastr.success(res.data.msg);
    dispatch(updateDocumentSuccess(res.data));
  }).catch((err) => {
    toastr.error(err.response.data.msg);
    throw (err);
  });

const deleteDocumentSuccess = payload => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
});

const deleteDocument = payload => dispatch => axios
 .delete(`api/documents/${payload}`)
 .then((res) => {
   toastr.success(res.data.msg);
   dispatch(deleteDocumentSuccess(res.data));
 }).catch((err) => {
   toastr.error(err.response.data.msg);
   throw (err);
 });
const searchDocumentsSuccess = payload => ({
  type: actionTypes.SEARCH_DOCUMENT_SUCCESS, payload
});

const searchDocuments = payload => dispatch => axios
  .get(`api/search/documents/?q=${payload.query}&offset=${payload.offset}&limit=${payload.limit}`)
  .then((res) => {
    dispatch(searchDocumentsSuccess(res.data));
  });
export {
  createDocument,
  getMydocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
};


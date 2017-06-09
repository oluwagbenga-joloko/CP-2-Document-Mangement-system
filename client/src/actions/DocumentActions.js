import axios from 'axios';
import toastr from 'toastr';
import actionTypes from './actionTypes';


const createDocumentSuccess = payload => ({
  type: actionTypes.CREATE_DOCUMENT_SUCCESS, payload
});
const createDocumentFaluire = payload => ({
  type: actionTypes.CREATE_DOCUMENT_FALUIRE, payload
});
const createDocument = payload => dispatch => axios
  .post('/api/documents', payload)
  .then((res) => {
    toastr.success('document created successfully');
    dispatch(createDocumentSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.msg);
    dispatch(createDocumentFaluire(error.response.data));
  });

const getMydocumentsSuccess = payload => ({
  type: actionTypes.GET_MY_DOCUMENTS_SUCCESS,
  payload
});
const getMydocumentsfailure = payload => ({
  type: actionTypes.GET_MY_DOCUMENTS_SUCCESS,
  payload
});
const getMydocuments = payload => dispatch => axios
  .get(`api/users/${payload}/documents`)
  .then((res) => {
    dispatch(getMydocumentsSuccess(res.data));
  })
  .catch((err) => {
    dispatch(getMydocumentsfailure(err.respponse.data));
  });

const getDocumentSuccess = payload => ({
  type: actionTypes.GET_DOCUMENT_SUCCESS, payload
});
const getDocumentFailure = payload => ({
  type: actionTypes.GET_MY_DOCUMENTS_FAILURE, payload
});

const getDocument = payload => dispatch => axios
  .get(`api/documents/${payload}`)
  .then((res) => {
    dispatch(getDocumentSuccess(res.data));
  })
  .catch((error) => {
    dispatch(getDocumentFailure(error.response.data));
  });
const updateDocumentSuccess = payload => ({
  type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload
});
const updateDocumentFailure = payload => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
});
const updateDocument = payload => dispatch => axios
  .put(`api/documents/${payload.id}`, payload)
  .then((res) => {
    toastr.success(res.data.msg);
    dispatch(updateDocumentSuccess(res.data));
  }).catch((error) => {
    toastr.error(error.response.data.msg);
    dispatch(updateDocumentFailure(error.response.data));
  });

const deleteDocumentSuccess = payload => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
});
// const deleteDocumentFailure = payload => ({
//   // type: actionTypes.DELETE_DOCUMENT_, payload
// });
const deleteDocument = payload => dispatch => axios
 .delete(`api/documents/${payload}`)
 .then((res) => {
   toastr.success(res.data.msg);
   dispatch(deleteDocumentSuccess(res.data));
 }).catch((error) => {
  //  dispatch(deleteDocumentFailure(error.response.data));
 });
export {
  createDocument,
  getMydocuments,
  getDocument,
  updateDocument,
  deleteDocument
};


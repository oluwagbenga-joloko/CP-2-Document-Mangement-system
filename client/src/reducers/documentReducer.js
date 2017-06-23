import actionTypes from '../actions/actionTypes';

const doumentReducer = (state = {
  generalDocuments: [],
  userDocuments: [],
  document: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DOCUMENTS_SUCCESS:
      return { ...state,
        userDocuments: action.payload.documents,
        userDocumentsMetaData: action.payload.metaData };
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return { ...state,
        generalDocuments: action.payload.documents,
        generalDocumentsMetaData: action.payload.metaData };
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload.document };
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload.document };
    default:
      return state;
  }
};
export default doumentReducer;

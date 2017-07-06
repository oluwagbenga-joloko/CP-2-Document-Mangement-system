import actionTypes from '../actions/actionTypes';

const doumentReducer = (state = {
  generalDocuments: [],
  userDocuments: [],
  document: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DOCUMENTS_SUCCESS:
      return { ...state,
        userDocuments: action.payload.documents,
        userDocumentspagination: action.payload.pagination };
    case actionTypes.GET_USER_DOCUMENTS_FAILURE:
      return { ...state, userDocuments: []
      };
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return { ...state,
        generalDocuments: action.payload.documents,
        generalDocumentspagination: action.payload.pagination };
    case actionTypes.SEARCH_DOCUMENT_FAILURE:
      return { ...state, generalDocuments: []
      };
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    default:
      return state;
  }
};
export default doumentReducer;

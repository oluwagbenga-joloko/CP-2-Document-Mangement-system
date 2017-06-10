import actionTypes from '../actions/actionTypes';

const doumentReducer = (state = { Documents: [], document: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_DOCUMENTS_FAILURE:
      return { ...state, allDocs: false, Documents: null };
    case actionTypes.GET_MY_DOCUMENTS_SUCCESS:
      return { ...state, allDocs: true, Documents: action.payload.documents };
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return { ...state, allDocs: true, Documents: action.payload.documents };
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return { ...state, getdoc: true, document: action.payload.document };
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload.document };
    default:
      return state;
  }
};
export default doumentReducer;

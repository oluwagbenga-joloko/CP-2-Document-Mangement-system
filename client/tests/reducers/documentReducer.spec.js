import { expect } from 'chai';
import documentReducer from '../../src/reducers/documentReducer';
import actionTypes from '../../src/actions/actionTypes';
import { createDocumentSuccess,
    updateDocumentSuccess,
    searchDocumentsSuccess,
    getUserDocumentsSuccess,
    getDocumentSuccess,
    getUserDocumentsFailure,
    searchDocumentsFailure,
} from '../../src/actions/documentActions';

let action;
let newState;
let payload;

describe('documentReducer', () => {
  it('it should return initial state', () => {
    newState = documentReducer(undefined, {});
    expect(newState).to.eql({
      generalDocuments: [],
      userDocuments: [],
      document: {} });
  });
  it(`it should handle ${actionTypes.CREATE_DOCUMENT_SUCCESS}`, () => {
    payload = { title: 'test', content: 'test test', access: 'public'
    };
    action = createDocumentSuccess(payload);
    newState = documentReducer({}, action);
    expect(newState.document).to.eql(payload);
  });
  it(`it should handle ${actionTypes.UPDATE_DOCUMENT_FAILURE}`, () => {
    payload = { title: 'testing', content: 'testing testing', access: 'public'
    };
    action = updateDocumentSuccess(payload);
    newState = documentReducer({}, action);
    expect(newState.document).to.eql(payload);
  });
  it(`it should handle ${actionTypes.GET_DOCUMENT_SUCCESS}`, () => {
    payload = { title: 'testing', content: 'testing testing', access: 'public'
    };
    action = getDocumentSuccess(payload);
    newState = documentReducer({}, action);
    expect(newState.document).to.eql(payload);
  });
  it(`it should handle ${actionTypes.GET_USER_DOCUMENTS_SUCCESS}`, () => {
    payload = { documents: [
      { title: 'testing', content: 'testing testing', access: 'public' },
      { title: 'testing', content: 'testing testing', access: 'public' }
    ],
      pagination: { pageCount: 3, currentPage: 10 }
    };
    action = getUserDocumentsSuccess(payload);
    newState = documentReducer({}, action);
    expect(newState.userDocuments).to.eql(payload.documents);
    expect(newState.userDocumentspagination).to.eql(payload.pagination);
  });
  it(`it should handle ${actionTypes.GET_USER_DOCUMENTS_FAILURE}`, () => {
    action = getUserDocumentsFailure();
    newState = documentReducer({}, action);
    expect(newState.userDocuments).to.eql([]);
  });
  it(`it should handle ${actionTypes.SEARCH_DOCUMENT_SUCCESS}`, () => {
    payload = { documents: [
      { title: 'testing', content: 'testing testing', access: 'public' },
      { title: 'testing', content: 'testing testing', access: 'public' }
    ],
      pagination: { pageCount: 3, currentPage: 10 }
    };
    action = searchDocumentsSuccess(payload);
    newState = documentReducer({}, action);
    expect(newState.generalDocuments).to.eql(payload.documents);
    expect(newState.generalDocumentspagination).to.eql(payload.pagination);
  });
  it(`it should handle ${actionTypes.SEARCH_DOCUMENT_FAILURE}`, () => {
    action = searchDocumentsFailure();
    newState = documentReducer({}, action);
    expect(newState.generalDocuments).to.eql([]);
  });
});

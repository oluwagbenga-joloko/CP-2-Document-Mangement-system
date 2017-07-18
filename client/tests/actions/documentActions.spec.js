import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import actionTypes from '../../src/actions/actionTypes';
import { createDocument,
      getDocument, getUserDocuments, updateDocument,
      searchDocuments, deleteDocument
    } from '../../src/actions/documentActions';
import { documents, pagination, document, search } from '../testData';

let expectedActions;
let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async documentActions ', () => {
  afterEach(() => {
    moxios.uninstall();
  });
  beforeEach(() => {
    moxios.install();
  });
  it(`creates ${actionTypes.CREATE_DOCUMENT_SUCCESS}
  and  ${actionTypes.BEGIN_AJAX_CALL}
     when createdocument action succeeds`, () => {
    moxios.stubRequest('/api/documents', {
      status: 201,
      response: { message: 'document created successfully', document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.CREATE_DOCUMENT_SUCCESS,
        payload: { message: 'document created successfully', document } }
    ];
    store = mockStore({});
    return store.dispatch(createDocument(document))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.AJAX_CALL_ERROR} when createDocument action fails`, () => {
    moxios.stubRequest('/api/documents', {
      status: 401,
      response: { message: 'access cannot be empty', document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(createDocument(document))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates ${actionTypes.BEGIN_AJAX_CALL} 
  and ${actionTypes.SEARCH_DOCUMENT_SUCCESS}
     when searchDocuments action succeeds`, () => {
    let queryString = `q=${search.query}&offset=${search.offset}`;
    queryString += `&limit=${search.limit}&access=${search.access}`;
    moxios.stubRequest(`api/search/documents/?${queryString}`, {
      status: 201,
      response: { message: 'get document success', documents, pagination }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.SEARCH_DOCUMENT_SUCCESS,
        payload: { message: 'get document success', documents, pagination } }
    ];
    store = mockStore({});
    return store.dispatch(searchDocuments(search))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.SEARCH_DOCUMENT_FAILURE},
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.AJAX_CALL_ERROR} when searchDocuments action fails`, () => {
    let queryString = `q=${search.query}&offset=${search.offset}`;
    queryString += `&limit=${search.limit}&access=${search.access}`;
    moxios.stubRequest(`api/search/documents/?${queryString}`, {
      status: 401,
      response: { message: 'an unknown error occured', document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
       { type: actionTypes.SEARCH_DOCUMENT_FAILURE },
      { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(searchDocuments(search))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates 
    ${actionTypes.BEGIN_AJAX_CALL}
    and ${actionTypes.GET_USER_DOCUMENTS_SUCCESS}
     when getUserDocuments action succeeds`, () => {
    let queryString = `q=${search.query}&offset=${search.offset}`;
    queryString += `&limit=${search.limit}&access=${search.access}`;
    moxios.stubRequest(`api/search/userdocuments/?${queryString}`, {
      status: 201,
      response: { message: 'get document success', documents, pagination }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.GET_USER_DOCUMENTS_SUCCESS,
        payload: { message: 'get document success', documents, pagination } }
    ];
    store = mockStore({});
    return store.dispatch(getUserDocuments(search))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.AJAX_CALL_ERROR} when getUserDocuments action fails`, () => {
    let queryString = `q=${search.query}&offset=${search.offset}`;
    queryString += `&limit=${search.limit}&access=${search.access}`;
    moxios.stubRequest(`api/search/userdocuments/?${queryString}`, {
      status: 401,
      response: { message: 'an unknown error occured', document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.GET_USER_DOCUMENTS_FAILURE },
      { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(getUserDocuments(search))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates 
    ${actionTypes.BEGIN_AJAX_CALL}
    and ${actionTypes.GET_DOCUMENT_SUCCESS}
     when getDocument action succeeds`, () => {
    moxios.stubRequest('api/documents/2', {
      status: 201,
      response: { document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.GET_DOCUMENT_SUCCESS,
        payload: document }
    ];
    store = mockStore({});
    return store.dispatch(getDocument(2))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.AJAX_CALL_ERROR} when getDocument action fails`, () => {
    moxios.stubRequest('api/documents/2', {
      status: 401,
      response: { message: 'an unknown error occured' }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(getDocument(2))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates 
    ${actionTypes.BEGIN_AJAX_CALL}
    and ${actionTypes.UPDATE_DOCUMENT_SUCCESS}
     when updateDocument action succeeds`, () => {
    moxios.stubRequest(`api/documents/${document.id}`, {
      status: 201,
      response: { document }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
        payload: document }
    ];
    store = mockStore({});
    return store.dispatch(updateDocument(document))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.AJAX_CALL_ERROR} when updateDocument action fails`, () => {
    moxios.stubRequest(`api/documents/${document.id}`, {
      status: 401,
      response: { message: 'an unknown error occured' }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(updateDocument(document))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates
    ${actionTypes.BEGIN_AJAX_CALL} and
     ${actionTypes.DELETE_DOCUMENT_SUCCESS} 
     when deleteDocument action succeeds`, () => {
    moxios.stubRequest('api/documents/2', {
      status: 200,
      response: { message: 'document deleted' }
    });
    expectedActions = [
      { type: actionTypes.DELETE_DOCUMENT_SUCCESS,
        payload: { message: 'document deleted' } },
    ];
    store = mockStore({});
    return store.dispatch(deleteDocument(2))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});

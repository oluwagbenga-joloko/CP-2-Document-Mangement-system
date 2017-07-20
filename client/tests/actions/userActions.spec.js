import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import actionTypes from '../../src/actions/actionTypes';
import { getCurrentUser, searchUser, deleteUser, updateUser
    } from '../../src/actions/userActions';
import { users, search, user } from '../testData';

let expectedActions;
let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async UserActions ', () => {
  afterEach(() => {
    moxios.uninstall();
  });
  beforeEach(() => {
    moxios.install();
  });
  it(`creates 
    ${actionTypes.GET_CURRENT_USER_SUCCESS}
     when getCurrentUser action succeeds`, () => {
    moxios.stubRequest('api/users/2', {
      status: 200,
      response: { user }
    });
    expectedActions = [
      { type: actionTypes.GET_CURRENT_USER_SUCCESS,
        payload: user }
    ];
    store = mockStore({});
    return store.dispatch(getCurrentUser(2))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(` does not creates 
    ${actionTypes.GET_CURRENT_USER_SUCCESS}
     when getCurrentUser action user fails `, () => {
    moxios.stubRequest('api/users/2', {
      status: 402,
      response: { user }
    });
    expectedActions = [
      { type: actionTypes.GET_CURRENT_USER_SUCCESS,
        payload: user }
    ];
    store = mockStore({});
    return store.dispatch(getCurrentUser(2))
    .catch(() => {
      expect(store.getActions()).to.not.eql(expectedActions);
    });
  });
  it(`creates 
    ${actionTypes.SEARCH_USER_SUCCESS} and 
    ${actionTypes.BEGIN_AJAX_CALL}
     when searchUser action succeeds`, () => {
    const { query, offset, limit } = search;
    const queryString = `q=${query}&offset=${offset}&limit=${limit}`;
    moxios.stubRequest(`api/search/users/?${queryString}`, {
      status: 200,
      response: { users }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.SEARCH_USER_SUCCESS,
        payload: { users } }
    ];
    store = mockStore({});
    return store.dispatch(searchUser(search))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(` creates
    ${actionTypes.AJAX_CALL_ERROR}
     when searchUser action fails`, () => {
    const { query, offset, limit } = search;
    const queryString = `q=${query}&offset=${offset}&limit=${limit}`;
    moxios.stubRequest(`api/search/users/?${queryString}`, {
      status: 402,
      response: { message: 'an error occured' }
    });
    expectedActions = [
       { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(searchUser(search))
    .catch(() => {
      expect(store.getActions()).to.not.eql(expectedActions);
    });
  });
  it(`creates ${actionTypes.BEGIN_AJAX_CALL} and 
   ${actionTypes.UPDATE_USER_SUCCESS}
    when updateUser action succeeds`, () => {
    moxios.stubRequest('api/users/2', {
      status: 200,
      response: { message: 'update success' }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.UPDATE_USER_SUCCESS },
    ];
    store = mockStore({});
    return store.dispatch(updateUser({ userId: 2 }))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(` creates
    ${actionTypes.AJAX_CALL_ERROR}
     when updateUser action fails`, () => {
    moxios.stubRequest('api/users/2', {
      status: 402,
      response: { message: 'an error occured' }
    });
    expectedActions = [
       { type: actionTypes.AJAX_CALL_ERROR },
    ];
    store = mockStore({});
    return store.dispatch(updateUser({ userId: 2 }))
    .catch(() => {
      expect(store.getActions()).to.not.eql(expectedActions);
    });
  });
  it(` creates
    ${actionTypes.DELETE_USER_SUCCESS}
    when get deleteUser action succeeds`, () => {
    moxios.stubRequest('api/users/2', {
      status: 200,
      response: { message: 'deleted success' }
    });
    expectedActions = [
      { type: actionTypes.DELETE_USER_SUCCESS,
        payload: { message: 'deleted success' } },
    ];
    store = mockStore({});
    return store.dispatch(deleteUser(2))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`should not create
    ${actionTypes.DELETE_USER_SUCCESS}
    when deleteUser action fails`, () => {
    moxios.stubRequest('api/users/2', {
      status: 400,
      response: { message: 'an error occured' }
    });
    expectedActions = [
      { type: actionTypes.DELETE_USER_SUCCESS,
        payload: { message: 'an error occured' } },
    ];
    store = mockStore({});
    return store.dispatch(deleteUser(2))
    .catch(() => {
      expect(store.getActions()).to.not.eql(expectedActions);
    });
  });
});

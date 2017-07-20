import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import actionTypes from '../../src/actions/actionTypes';
import { login, signUp } from '../../src/actions/authActions';

const token = jwt.sign({ id: 15 }, 'secret', { expiresIn: 60 * 60 });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let expectedActions;
let store;

describe('async authActions ', () => {
  afterEach(() => {
    moxios.uninstall();
  });
  beforeEach(() => {
    moxios.install();
  });


  it(`creates ${actionTypes.BEGIN_AJAX_CALL} and 
    ${actionTypes.LOGIN_SUCCESS} when login succeeds`, () => {
    moxios.stubRequest('/api/users/login', {
      status: 200,
      response: { message: 'login successfull', token }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.LOGIN_SUCCESS, payload: { userId: 15 } }
    ];
    store = mockStore({});
    return store.dispatch(login({ firstName: 'bola', password: 'test' }))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates ${actionTypes.BEGIN_AJAX_CALL} ,
     ${actionTypes.AJAX_CALL_ERROR} and
     ${actionTypes.LOGIN_FALUIRE} when login fails`, () => {
    moxios.stubRequest('/api/users/login', {
      status: 400,
      response: { message: 'invalid password' }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.AJAX_CALL_ERROR },
      { type: actionTypes.LOGIN_FALUIRE,
        payload: { message: 'invalid password' }
      }
    ];
    store = mockStore({});
    return store.dispatch(login({
      firstName: 'bola',
      password: 'test'
    }))
    .catch(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
  it(`creates ${actionTypes.BEGIN_AJAX_CALL} and
    ${actionTypes.SIGN_UP_SUCCESS} when signUp succeeds`, () => {
    moxios.stubRequest('/api/users', {
      status: 201,
      response: { message: 'sign up successfull', token }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.SIGN_UP_SUCCESS, payload: { userId: 15 } }
    ];
    store = mockStore({});
    return store.dispatch(signUp({
      firstName: 'bola',
      lastName: 'test',
      password: 'test',
      email: 'test@test.com' }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it(`creates ${actionTypes.BEGIN_AJAX_CALL} ,
     ${actionTypes.AJAX_CALL_ERROR} and
     ${actionTypes.SIGN_UP_FALUIRE} when signUp fails`, () => {
    moxios.stubRequest('/api/users', {
      status: 404,
      response: { message: 'email exists' }
    });
    expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      { type: actionTypes.AJAX_CALL_ERROR },
      { type: actionTypes.SIGN_UP_FALUIRE,
        payload: { message: 'email exists' }
      }
    ];
    store = mockStore({});
    return store.dispatch(signUp({
      firstName: 'bola',
      lastName: 'test',
      password: 'test',
      email: 'test@test.com' }))
      .catch(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});

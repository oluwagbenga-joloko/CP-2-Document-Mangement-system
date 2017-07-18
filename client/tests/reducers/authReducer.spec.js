import { expect } from 'chai';
import authReducer from '../../src/reducers/authReducer';
import actionTypes from '../../src/actions/actionTypes';
import { loginSuccess, loginFaliure,
   signUpFaliure, signUpSuccess, logout } from '../../src/actions/authActions';


let action;
let newState;
let payload;

describe('authReducer', () => {
  it('it should return initial state', () => {
    newState = authReducer(undefined, {});
    expect(newState).to.eql({ userId: null });
  });
  it(`it should handle ${actionTypes.LOGIN_SUCCESS}`, () => {
    action = loginSuccess({ userId: 2 });
    newState = authReducer(undefined, action);
    expect(newState.userId).to.eql(2);
  });
  it(`it should handle ${actionTypes.LOGIN_FALUIRE}`, () => {
    payload = { message: 'invalid email' };
    action = loginFaliure(payload);
    newState = authReducer(undefined, action);
    expect(newState.message).to.eql('invalid email');
  });
  it(`it should handle ${actionTypes.SIGN_UP_SUCCESS}`, () => {
    payload = { userId: 3 };
    action = signUpSuccess(payload);
    newState = authReducer(undefined, action);
    expect(newState.userId).to.eql(3);
  });
  it(`it should handle ${actionTypes.SIGN_UP_FALUIRE}`, () => {
    payload = { message: 'invalid email' };
    action = signUpFaliure(payload);
    newState = authReducer(undefined, action);
    expect(newState.message).to.eql('invalid email');
  });
  it(`it should handle ${actionTypes.LOG_OUT}`, () => {
    payload = { userId: null };
    action = logout(payload);
    newState = authReducer(undefined, action);
    expect(newState.userId).to.eql(null);
  });
});

import { expect } from 'chai';
import authReducer from '../../src/reducers/authReducer';
import actionTypes from '../../src/actions/actionTypes';
import { login } from '../../src/actions/authActions';

let action, newState;

describe('authReducer', () => {
  it('it should return initial state', () => {
    newState = authReducer(undefined, {});
    expect(newState).to.eql({ success: false, user: null });
  });

});

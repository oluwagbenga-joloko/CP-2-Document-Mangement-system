import { expect } from 'chai';
import userReducer from '../../src/reducers/userReducer';
import actionTypes from '../../src/actions/actionTypes';
import { getCurrentUserSuccess,
  searchUserSuccess, searchUserFailure
} from '../../src/actions/userActions';

let action;
let newState;
let payload;
describe('userReducer', () => {
  it('it should return initial state', () => {
    newState = userReducer(undefined, {});
    expect(newState).to.eql({
      users: [],
      pagination: null,
      currentUser: null });
  });
  it(`it should handle ${actionTypes.SEARCH_USER_SUCCESS}`, () => {
    payload = {
      users: [{ firstName: 'bola', lastName: 'yemi' },
       { firstName: 'ola', lastName: 'yemi' }],
      pagination: { pageCount: 30, pages: 5 }
    };
    action = searchUserSuccess(payload);
    newState = userReducer({}, action);
    expect(newState.users).to.eql(payload.users);
    expect(newState.pagination).to.eql(payload.pagination);
  });
  it(`it should handle ${actionTypes.SEARCH_USER_FAILURE}`, () => {
    payload = {
      users: []
    };
    action = searchUserFailure();
    newState = userReducer({}, action);
    expect(newState.users).to.eql(payload.users);
  });
  it(`it should handle ${actionTypes.GET_CURRENT_USER_SUCCESS}`, () => {
    payload = { firstName: 'bola', lastName: 'yemi' };
    action = getCurrentUserSuccess(payload);
    newState = userReducer({}, action);
    expect(newState.currentUser).to.eql(payload);
  });
});

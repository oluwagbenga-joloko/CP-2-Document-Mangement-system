import { expect } from 'chai';
import ajaxCallReducer from '../../src/reducers/ajaxCallReducer';
import actionTypes from '../../src/actions/actionTypes';
import { ajaxCallError,
     beginAjaxCall } from '../../src/actions/ajaxStatusActions';

let action;
let newState;

describe('ajaxCallReducer', () => {
  it('it should return initial state', () => {
    action = { type: 'UNKNOWN' };
    newState = ajaxCallReducer(undefined, action);
    expect(newState.loading).to.eql(false);
  });
  it(`should handle ${actionTypes.BEGIN_AJAX_CALL}`, () => {
    action = beginAjaxCall();
    newState = ajaxCallReducer({}, action);
    expect(newState.loading).to.eql(true);
    expect(newState.loading).to.not.eql(false);
  });
  it(`should handle ${actionTypes.AJAX_CALL_ERROR}`, () => {
    action = ajaxCallError();
    newState = ajaxCallReducer({}, action);
    expect(newState.loading).to.eql(false);
    expect(newState.loading).to.not.eql(true);
  });
  it('should handle actions that that end in _SUCCESS', () => {
    action = { type: 'SING_SUCCESS' };
    newState = ajaxCallReducer({}, action);
    expect(newState.loading).to.eql(false);
    expect(newState.loading).to.not.eql(true);
  });
});


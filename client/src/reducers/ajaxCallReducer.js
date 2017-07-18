import actionTypes from '../actions/actionTypes';

const actionTypeEndsInSuccess = type =>
(type.substring(type.length - 8) === '_SUCCESS');

const ajaxCallReducer = (state = { loading: false }, action) => {
  switch (true) {
    case action.type === actionTypes.BEGIN_AJAX_CALL:
      return { loading: true };
    case action.type === actionTypes.AJAX_CALL_ERROR
    || actionTypeEndsInSuccess(action.type):
      return { loading: false };
    default:
      return state;
  }
};
export default ajaxCallReducer;

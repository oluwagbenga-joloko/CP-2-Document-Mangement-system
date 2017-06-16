import actionTypes from './actionTypes';

const beginAjaxCall = () => ({ type: actionTypes.BEGIN_AJAX_CALL });
const ajaxCallError = () => ({ type: actionTypes.AJAX_CALL_ERROR });
export { beginAjaxCall, ajaxCallError };

import actionTypes from './actionTypes';
/**
 * @desc beginAjaxCall action creator
 * @return {object} returns action
 */
const beginAjaxCall = () => ({ type: actionTypes.BEGIN_AJAX_CALL });
/**
 * @desc ajaxCallError action creator
 * @return {object} returns action
 */
const ajaxCallError = () => ({ type: actionTypes.AJAX_CALL_ERROR });
export { beginAjaxCall, ajaxCallError };

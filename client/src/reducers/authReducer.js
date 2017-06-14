import actionTypes from '../actions/actionTypes';
import checkAuth from '../utils/checkAuth';

const authReducer = (state = checkAuth(), action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_USER_SUCCESS:
      return action.payload;
    case actionTypes.LOGIN_FALUIRE:
      return action.payload;
    case actionTypes.SIGN_UP_FALUIRE:
      return action.payload;
    case actionTypes.SIGN_UP_SUCCESS:
      return action.payload;
    case actionTypes.LOG_OUT:
      return action.payload;
    default:
      return state;
  }
};
export default authReducer;

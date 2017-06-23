import actionTypes from '../actions/actionTypes';
import checkAuth from '../utils/checkAuth';

const token = window.localStorage.getItem('token');

const authReducer = (state = checkAuth(token), action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.LOGIN_FALUIRE:
      return { ...state, ...action.payload };
    case actionTypes.SIGN_UP_FALUIRE:
      return { ...state, ...action.payload };
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.LOG_OUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default authReducer;

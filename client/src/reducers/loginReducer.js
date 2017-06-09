import actionTypes from '../actions/actionTypes';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default loginReducer;

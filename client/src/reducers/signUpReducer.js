import actionTypes from '../actions/actionTypes';

const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default signUpReducer;

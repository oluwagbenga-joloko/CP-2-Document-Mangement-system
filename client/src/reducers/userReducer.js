import actionTypes from '../actions/actionTypes';

const userReducer = (state = { users: [], user: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload.users };
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};
export default userReducer;

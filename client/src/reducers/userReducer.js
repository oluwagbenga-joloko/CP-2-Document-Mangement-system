import actionTypes from '../actions/actionTypes';

const userReducer = (state = { users: [], user: {}, count: null }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload.users, count: action.payload.count };
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state, users: action.payload.users, count: action.payload.count };
    default:
      return state;
  }
};
export default userReducer;

import actionTypes from '../actions/actionTypes';

const userReducer = (state = {
  users: [],
  pagination: null,
  currentUser: null }, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state,
        users: action.payload.users,
        pagination: action.payload.pagination };
    case actionTypes.SEARCH_USER_FAILURE:
      return { ...state,
        users: [],
      };
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
export default userReducer;

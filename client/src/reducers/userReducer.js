import actionTypes from '../actions/actionTypes';

const userReducer = (state = { users: [], user: null, metaData: null, currentUser: null }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload.users, count: action.payload.count };
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state, users: action.payload.users, metaData: action.payload.metaData };
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
export default userReducer;

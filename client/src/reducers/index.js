import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';
import authReducer from './authReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';
import ajaxCallReducer from './ajaxCallReducer';

const appReducer = combineReducers({
  authReducer,
  documentReducer,
  userReducer,
  ajaxCallReducer
});
const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOG_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';
import ajaxCallReducer from './ajaxCallReducer';

const rootReducer = combineReducers({
  authReducer,
  documentReducer,
  userReducer,
  ajaxCallReducer
});

export default rootReducer;

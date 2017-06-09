import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  authReducer,
  documentReducer,
  userReducer
});

export default rootReducer;

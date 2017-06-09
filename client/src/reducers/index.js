import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';

const rootReducer = combineReducers({
  authReducer,
  documentReducer
});

export default rootReducer;

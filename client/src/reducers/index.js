import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  currentUsers: userReducer,
});

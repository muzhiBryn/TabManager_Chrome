import { combineReducers } from 'redux';

import tabReducer from './tabReducer';
import projectReducer from './projectReducer';
import preferenceReducer from './preferenceReducer';
import authReducer from './authReducer';

export default combineReducers({
  tabs: tabReducer,
  projects: projectReducer,
  preferences: preferenceReducer,
  auth: authReducer,
});

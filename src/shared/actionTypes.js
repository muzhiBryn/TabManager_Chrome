const ActionTypes = {
  CHROME_ERROR: 'CHROME_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',

  GET_TABS_REQUESTED: 'GET_TABS_REQUESTED',
  GET_TABS_FULLFILLED: 'GET_TABS_FULLFILLED',

  OPEN_TABS_REQUESTED: 'OPEN_TABS_REQUESTED',
  OPEN_TABS_FULLFILLED: 'OPEN_TABS_FULLFILLED',

  CLOSE_TABS_REQUESTED: 'CLOSE_TABS_REQUESTED',
  CLOSE_TABS_FULLFILLED: 'CLOSE_TABS_FULLFILLED',

  TABS_REMOVED: 'TABS_REMOVED',
  TABS_UPDATED: 'TABS_UPDATED',

  SWITCH_TAB_REQUESTED: 'SWITCH_TAB_REQUESTED',
  SWITCH_TAB_FULLFILLED: 'SWITCH_TAB_FULLFILLED',

  MOVE_TAB: 'MOVE_TAB',
  UPDATE_TAB_PROJ: 'UPDATE_TAB_PROJ',

  SWITCH_PROJECT: 'SWITCH_PROJECT',

  NEW_PROJECT_REQUESTED: 'NEW_PROJECT_REQUESTED',
  NEW_PROJECT_FULLFILLED: 'NEW_PROJECT_FULLFILLED',

  DELETE_PROJECT_REQUESTED: 'DELETE_PROJECT_REQUESTED',
  DELETE_PROJECT_FULLFILLED: 'DELETE_PROJECT_FULLFILLED',

  MERGE_PROJECTS_REQUESTED: 'MERGE_PROJECTS_REQUESTED',
  MERGING_PROJECTS: 'MERGING_PROJECTS',
  MERGE_PROJECTS_FULLFILLED: 'MERGE_PROJECTS_FULLFILLED',
  POST_MERGE_PROJECTS: 'POST_MERGE_PROJECTS',

  UPDATE_PROJECT_REQUESTED: 'UPDATE_PROJECT_REQUESTED',
  UPDATE_PROJECT_FULLFILLED: 'UPDATE_PROJECT_FULLFILLED',

  LOAD_PROJECTS_REQUESTED: 'LOAD_PROJECTS_REQUESTED',
  LOAD_PROJECTS_FULLFILLED: 'LOAD_PROJECTS_FULLFILLED',

  ADD_RESOURCES_REQUESTED: 'ADD_RESOURCES_REQUESTED',
  ADD_RESOURCES_FULLFILLED: 'ADD_RESOURCES_FULLFILLED',

  LOAD_RESOURCES_REQUESTED: 'LOAD_RESOURCES_REQUESTED',
  LOAD_RESOURCES_FULLFILLED: 'LOAD_RESOURCES_FULLFILLED',

  DELETE_RESOURCES_REQUESTED: 'DELETE_RESOURCES_REQUESTED',
  DELETE_RESOURCES_FULLFILLED: 'DELETE_RESOURCES_FULLFILLED',

  UPDATE_RESOURCE_REQUESTED: 'UPDATE_RESOURCE_REQUESTED',
  UPDATE_RESOURCE_FULLFILLED: 'UPDATE_RESOURCE_FULLFILLED',

  SWITCH_VIEW: 'SWITCH_VIEW',
  SWITCH_SYNCHRONIZE: 'SWITCH_SYNCHRONIZE',

  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',

  SIGNIN_REQUESTED: 'SIGNIN_REQUESTED',
  SIGNUP_REQUESTED: 'SIGNUP_REQUESTED',
  SIGNOUT_REQUESTED: 'SIGNOUT_REQUESTED',
};

export default ActionTypes;

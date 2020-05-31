import ActionTypes from '../../../shared/actionTypes';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, userName: action.userName, error: null };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, error: null };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default authReducer;

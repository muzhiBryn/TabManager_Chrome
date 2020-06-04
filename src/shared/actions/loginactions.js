import ActionTypes from '../actionTypes';

export function requestSignIn({ email, password }, history) {
  return {
    type: ActionTypes.SIGNIN_REQUESTED,
    payload: {
      email,
      password,
    },
  };
}

export function requestSignUp({ email, password, userName }, history) {
  return {
    type: ActionTypes.SIGNUP_REQUESTED,
    payload: {
      email,
      password,
      userName,
    },
  };
}


export function requestSignOut(history) {
  return {
    type: ActionTypes.SIGNOUT_REQUESTED,
  };
}

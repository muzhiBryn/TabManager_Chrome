import ActionTypes from '../../../shared/actionTypes';
import { saveUserToken, removeUserToken } from '../localstorage';
import * as ajax from '../../../modules/ajax';

// TODO: Methods below should be updated with communication with the server

export function authError(error) {
  console.log(error);
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

const signInAlias = (req) => {
  const { email, password } = req.payload;
  return (dispatch) => {
    ajax.signUpUserApi({ email, password }).then(
      (token) => {
        saveUserToken(token);
        dispatch({ type: ActionTypes.AUTH_USER, userName: email });
      },
    ).catch((error) => {
      console.log('bad');
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
};

const signUpAlias = (req) => {
  const { email, password } = req.payload;
  return (dispatch) => {
    ajax.signUpUserApi({ email, password }).then(
      (token) => {
        saveUserToken(token);
        dispatch({ type: ActionTypes.AUTH_USER, userName: email });
      },
    ).catch((error) => {
      console.log('bad');
      dispatch(authError(`Sign Un Failed: ${error.response.data}`));
    });
  };
};


const signOutAlias = () => {
  return (dispatch, getState) => {
    const { authenticated } = getState().auth;
    if (authenticated) {
      removeUserToken();
      dispatch({
        type: ActionTypes.DEAUTH_USER,
      });
    }
  };
};


export default {
  SIGNIN_REQUESTED: signInAlias,
  SIGNUP_REQUESTED: signUpAlias,
  SIGNOUT_REQUESTED: signOutAlias,
};

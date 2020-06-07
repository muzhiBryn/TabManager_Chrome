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
    ajax.signInUserApi({ email, password }).then(
      ({ token, userName }) => {
        saveUserToken(token);
        dispatch({ type: ActionTypes.AUTH_USER, userName });
      },
    ).catch((error) => {
      // console.log(error.toString());
      dispatch(authError(`Sign In Failed: ${error}`));
    });
  };
};

const signUpAlias = (req) => {
  const { email, password, userName } = req.payload;
  return (dispatch) => {
    ajax.signUpUserApi({ email, password, userName }).then(
      ({ token }) => {
        saveUserToken(token);
        dispatch({ type: ActionTypes.AUTH_USER, userName });
      },
    ).catch((error) => {
      // console.log(error.toString());
      dispatch(authError(`Sign Up Failed: ${error}`));
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
    setTimeout(() => {
      dispatch({
        type: ActionTypes.LOAD_PROJECTS_REQUESTED,
      });
    }, 200);
  };
};

export default {
  SIGNIN_REQUESTED: signInAlias,
  SIGNUP_REQUESTED: signUpAlias,
  SIGNOUT_REQUESTED: signOutAlias,
};

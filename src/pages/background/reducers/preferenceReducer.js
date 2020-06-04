import ActionTypes from '../../../shared/actionTypes';

export default function preferenceReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_VIEW:
      return { ...state, displayType: action.view };
    case ActionTypes.SWITCH_SYNCHRONIZE:
      return { ...state, synchronize: action.syn };
    case ActionTypes.DEAUTH_USER:
      return { ...state, synchronize: -1 };
    default:
      return state;
  }
}

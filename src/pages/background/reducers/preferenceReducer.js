import ActionTypes from '../../../shared/actionTypes';

export default function preferenceReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_VIEW:
      return { ...state, displayType: action.view };
    default:
      return state;
  }
}

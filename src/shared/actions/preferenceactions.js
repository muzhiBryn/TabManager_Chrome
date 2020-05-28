import ActionTypes from '../actionTypes';

export default function requestSwitchView(view) {
  return {
    type: ActionTypes.SWITCH_VIEW_REQUESTED,
    payload: view,
  };
}

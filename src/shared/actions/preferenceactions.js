import ActionTypes from '../actionTypes';

export default function switchView(view) {
  return {
    type: ActionTypes.SWITCH_VIEW,
    view,
  };
}

import ActionTypes from '../actionTypes';

export function switchView(view) {
  return {
    type: ActionTypes.SWITCH_VIEW,
    view,
  };
}

export function switchSynchronize(syn) {
  return {
    type: ActionTypes.SWITCH_SYNCHRONIZE,
    syn,
  };
}

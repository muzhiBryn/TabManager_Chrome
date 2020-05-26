import ActionTypes from '../../../shared/actionTypes';

const defaultState = {
  activeProj: -1,
};

export default function listsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_PROJ:
      return { ...state, activeProj: action.payload };
    default:
      return state;
  }
}

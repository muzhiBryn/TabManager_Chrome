import ActionTypes from '../../../shared/actionTypes';

export default function projectReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_PROJECT_FULLFILLED:
      return { ...state, activeProj: action.activeProj };
    case ActionTypes.LOAD_PROJECTS_FULLFILLED:
      return { ...state, projectList: action.projects };
    default:
      return state;
  }
}

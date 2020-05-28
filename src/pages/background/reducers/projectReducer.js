import ActionTypes from '../../../shared/actionTypes';

export default function projectReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_PROJECT_FULLFILLED:
      return { ...state, activeProj: action.activeProj };
    case ActionTypes.LOAD_PROJECTS_FULLFILLED:
      return { ...state, projectList: action.projects };
    case ActionTypes.NEW_PROJECT_FULLFILLED:
      state.projectList.push(action.projectName);
      // eslint-disable-next-line no-param-reassign
      state.projectResouces[action.projectName] = {};
      return { ...state, activeProj: action.projectName };
    default:
      return state;
  }
}

import ActionTypes from '../../../shared/actionTypes';

export default function projectReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_PROJECT:
      return { ...state, activeProj: action.projectName };
    case ActionTypes.LOAD_PROJECTS_FULLFILLED:
      return { ...state, projectList: action.projects };
    case ActionTypes.NEW_PROJECT_FULLFILLED:
      state.projectList.push(action.projectName);
      // eslint-disable-next-line no-param-reassign
      return { ...state, activeProj: action.projectName };
    case ActionTypes.ADD_RESOURCE_FULLFILLED:
      return { ...state, projectResources: { ...state.projectResources, resources: { ...state.projectResources.resources, [action.tab.url]: action.tab } } };
    case ActionTypes.LOAD_RESOURCES_FULLFILLED:
      return { ...state, projectResources: action.payload };
    default:
      return state;
  }
}

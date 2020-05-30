import ActionTypes from '../../../shared/actionTypes';
import { removeProject } from '../localstorage';

export default function projectReducer(state = {}, action) {
  const { projectResources, projectList } = state;
  switch (action.type) {
    case ActionTypes.SWITCH_PROJECT:
      return { ...state, activeProj: action.projectName };
    case ActionTypes.LOAD_PROJECTS_FULLFILLED:
      return { ...state, projectList: action.projects };
    case ActionTypes.NEW_PROJECT_FULLFILLED:
      state.projectList.push(action.projectName);
      return { ...state, activeProj: action.projectName };
    case ActionTypes.UPDATE_PROJECT_FULLFILLED:
      const { updatedProj } = action;
      if (updatedProj.projectName !== projectResources.projectName) {
        removeProject(projectResources.projectName);
        projectList[projectList.findIndex((p)=>(p==projectResources.projectName))] = updatedProj.projectName;
        projectResources.projectName = updatedProj.projectName;
      }
      projectResources.projectNote = updatedProj.projectNote;
      return {...state, activeProj: updatedProj.projectName, projectList, projectResources};
    case ActionTypes.ADD_RESOURCE_FULLFILLED:
      projectResources.resources[action.tab.url] = action.tab; 
      return {...state, projectResources};
    case ActionTypes.LOAD_RESOURCES_FULLFILLED:
      return { ...state, projectResources: action.payload };
    default:
      return state;
  }
}

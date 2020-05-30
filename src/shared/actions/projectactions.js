import ActionTypes from '../actionTypes';

export function switchProject(projectName) {
  return {
    type: ActionTypes.SWITCH_PROJECT,
    projectName,
  };
}

export function requestLoadProjects() {
  return {
    type: ActionTypes.LOAD_PROJECTS_REQUESTED,
  };
}

export function requestNewProject(projectName) {
  console.log('new project requested');
  return {
    type: ActionTypes.NEW_PROJECT_REQUESTED,
    payload: projectName,
  };
}

export function requestDeleteProject(projectName) {
  return {
    type: ActionTypes.DELETE_PROJECT_REQUESTED,
    payload: projectName,
  };
}

export function requestUpdateProject(updatedProj) {
  return {
    type: ActionTypes.UPDATE_PROJECT_REQUESTED,
    payload: updatedProj,
  };
}

export function requestLoadResources(projectName) {
  return {
    type: ActionTypes.LOAD_RESOURCES_REQUESTED,
    payload: projectName,
  };
}

export function requestAddResource(tab, projectName) {
  return {
    type: ActionTypes.ADD_RESOURCE_REQUESTED,
    payload: {
      tab,
      projectName,
    },
  };
}

export function requestDeleteResource(projectName, url) {
  return {
    type: ActionTypes.DELETE_RESOUECE_REQUESTED,
    payload: {
      projectName,
      url,
    },
  };
}

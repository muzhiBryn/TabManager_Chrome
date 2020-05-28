import ActionTypes from '../actionTypes';

export function requestSwitchProject(projectName) {
  return {
    type: ActionTypes.SWITCH_PROJECT_REQUESTED,
    payload: projectName,
  };
}

export function requestLoadProjects() {
  return {
    type: ActionTypes.LOAD_PROJECTS_REQUESTED,
  };
}

export function requestNewProject(projectName) {
  return {
    type: ActionTypes.NEW_PROJECT_REQUESTED,
    payload: projectName,
  };
}

export function requestDeleteProject(projectId) {
  return {
    type: ActionTypes.DELETE_PROJECT_REQUESTED,
    payload: projectId,
  };
}

export function requestLoadResources(projectId) {
  return {
    type: ActionTypes.LOAD_RESOURCES_REQUESTED,
    payload: projectId,
  };
}

export function requestAddResource(projectId, tab) {
  return {
    type: ActionTypes.ADD_RESOURCE_REQUESTED,
    payload: {
      projectId,
      tab,
    },
  };
}

export function requestDeleteResource(projectId, tabId) {
  return {
    type: ActionTypes.DELETE_RESOUECE_REQUESTED,
    payload: {
      projectId,
      tabId,
    },
  };
}

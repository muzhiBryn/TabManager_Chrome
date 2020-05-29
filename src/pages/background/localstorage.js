// Reference: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export const loadProjectList = () => {
  try {
    const serializedState = localStorage.getItem('projectList');
    if (serializedState === null) {
      return ['General'];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return ['General'];
  }
};

export const loadProjectResources = (projectName) => {
  try {
    const serializedState = localStorage.getItem(projectName);
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveProjectList = (projectList) => {
  try {
    const serializedState = JSON.stringify(projectList);
    localStorage.setItem('projectList', serializedState);
  } catch {
    // ignore write errors
  }
};

export const saveProjectResources = (projectName, resourceList) => {
  try {
    const serializedState = JSON.stringify(resourceList);
    localStorage.setItem(projectName, serializedState);
  } catch {
    // ignore write errors
  }
};

// Reference: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export function loadProjectList() {
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

export function loadProjectResources(projectName) {
  try {
    const serializedState = localStorage.getItem('proj-'+projectName);
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export function loadPreferences() {
  try {
    const serializedState = localStorage.getItem('preferences');
    if (serializedState === null) {
      return { displayType: '0' };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { displayType: '0' };
  }
};

export function saveProjectList(projectList) {
  try {
    const serializedState = JSON.stringify(projectList);
    localStorage.setItem('projectList', serializedState);
  } catch {
    // ignore write errors
  }
};

export function saveProjectResources(projectName, resourceList) {
  try {
    const serializedState = JSON.stringify(resourceList);
    localStorage.setItem('proj-'+projectName, serializedState);
  } catch {
    // ignore write errors
  }
};

export function removeProject(projectName) {
  localStorage.removeItem('proj-'+projectName);
}

export function savePreferences(preferences) { 
  try {
    const serializedState = JSON.stringify(preferences);
    localStorage.setItem('preferences', serializedState);
  } catch {
    // ignore write errors
  }
};

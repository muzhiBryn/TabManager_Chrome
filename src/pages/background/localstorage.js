// Reference: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export function loadProjectList() {
  const defaultVal =  ['General'];
  try {
    const serializedState = localStorage.getItem('projectList');
    if (serializedState === null) {
      return defaultVal;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultVal;
  }
};

export function loadProjectResources(projectName) {
  const defaultVal = {projectNote:'', resources:{}};
  try {
    const serializedState = localStorage.getItem('proj-'+projectName);
    if (serializedState === null) {
      return defaultVal;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultVal;
  }
};

export function loadPreferences() {
  const defaultVal = { displayType: '0' }
  try {
    const serializedState = localStorage.getItem('preferences');
    if (serializedState === null) {
      return defaultVal;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultVal;
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

export function saveProjectResources(projectName, projectNote, resources) {
  try {
    const serializedState = JSON.stringify({projectNote, resources});
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

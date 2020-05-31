// Reference: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
import Values from '../../shared/values';

export function loadProjectList() {
  const defaultVal =  [Values.defaultProject];
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

export function loadcurrentProject(projectName) {
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
  const defaultVal = { displayType: '0', synchronize: -1 }
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

export function savecurrentProject(projectName, projectNote, resources) {
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

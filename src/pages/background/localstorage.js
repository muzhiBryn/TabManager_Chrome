// Reference: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export const loadProjects = () => {
  try {
    const serializedState = localStorage.getItem('projects');
    if (serializedState === null) {
      return {
        projectList: ['General', 'Common'],
        projectResouces: { General: [], Common: [] },
        activeProj: 'General',
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveProjects = (projects) => {
  try {
    const serializedState = JSON.stringify(projects);
    localStorage.setItem('projects', serializedState);
  } catch {
    // ignore write errors
  }
};

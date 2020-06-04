import axios from 'axios';
import ActionTypes from '../shared/actionTypes';

const rootUrl = 'http://localhost:8080';
// the next line is where our database will be stored!
// const rootUrl = 'https://too-many-tabz.herokuapp.com/api';

const serverError = (dispatch, error) => {
  console.log(error);
  return dispatch({
    type: ActionTypes.SERVER_ERROR,
    error: error.toString(),
  });
};

export const signInUserApi = (user) => {
  return new Promise((resolve, reject) => {
    const fields = {
      email: user.email, password: user.password,
    };
    console.log(fields);
    axios.post(`${rootUrl}/signin`, fields)
      .then((response) => {
        // response.data should have {token}
        console.log(response.data);
        resolve(response.data.token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signUpUserApi = (user) => {
  return new Promise((resolve, reject) => {
    const fields = {
      email: user.email, password: user.password,
    };
    console.log(fields);
    axios.post(`${rootUrl}/signup`, fields)
      .then((response) => {
        console.log(response.data);
        resolve(response.data.token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export function loadProjects(dispatch) {
  dispatch(() => {
    axios.get(`${rootUrl}/projects`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.LOAD_PROJECTS_FULLFILLED,
        projectList: response.data,
      }); // // Should return an array of project names
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function mergeProjects(dispatch, projects, callback) {
  dispatch(() => {
    axios.put(`${rootUrl}/projects`, projects, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.MERGE_PROJECTS_FULLFILLED,
        projectList: response.data,
      }); // Please check mergeProjectsRequested in aliases4projects for details
      setTimeout(() => {
        dispatch({
          type: ActionTypes.POST_MERGE_PROJECTS,
        });
      }, 3000); // Change back synchronizing status
      if (callback)callback();
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function newProject(dispatch, projectName) {
  dispatch(() => {
    axios.post(`${rootUrl}/projects`, projectName, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.NEW_PROJECT_FULLFILLED,
        projectName,
      }); // No data is required from the server here, since we only need the name, which is already known
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function loadProject(dispatch, projectName) {
  dispatch(() => {
    axios.get(`${rootUrl}/projects/${projectName}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.LOAD_RESOURCES_FULLFILLED,
        currentProject: response.data,
      }); // Should return current project
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function deleteProject(dispatch, projectName) {
  dispatch(() => {
    axios.delete(`${rootUrl}/projects`, projectName, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.DELETE_PROJECT_FULLFILLED,
        projectName,
        projectList: response.data,
      }); // Should return new project list
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

// Here are two put project methods
// Should check the keys in updatedProject
export function updateProject(dispatch, projectName, updatedProj, callback) {
  dispatch(() => {
    axios.put(`${rootUrl}/projects/${projectName}`, updatedProj, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_PROJECT_FULLFILLED,
        activeProj: updatedProj.projectName,
        currentProject: response.data.currentProject,
        projectList: response.data.projectList,
      }); // Should return new current project and project list
      if (callback)callback();
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function addResources(dispatch, projectName, tabResources) {
  dispatch(() => {
    axios.put(`${rootUrl}/projects/${projectName}`, { resources: tabResources }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // We want to add the resource to our resources (or maybe update it)
      dispatch({
        type: ActionTypes.ADD_RESOURCES_FULLFILLED,
        currentProject: response.data,
      }); // Should return new current project
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function deleteResources(dispatch, projectName, urls) {
  dispatch(() => {
    axios.delete(`${rootUrl}/resources/${projectName}`, urls, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // Find the urls in the array tabUrls
      dispatch({
        type: ActionTypes.DELETE_RESOURCES_REQUESTED,
        currentProject: response.data,
      }); // Should return new current project
    }).catch((error) => {
      serverError(dispatch, error);
    });
  });
}

export function updateResource(dispatch, updatedResource, projectName) {
  axios.put(`${rootUrl}/resources/${projectName}/`, updatedResource, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    dispatch({
      type: ActionTypes.UPDATE_RESOURCE_FULLFILLED,
      resource: response.data,
    });
    // updatedResource would always contain the url, but may not contain other keys
    // Should return the updated resource
  }).catch((error) => {
    serverError(dispatch, error);
  });
}

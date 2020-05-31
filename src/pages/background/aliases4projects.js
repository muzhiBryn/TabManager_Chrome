import ActionTypes from '../../shared/actionTypes';
import { loadcurrentProject, removeProject } from './localstorage';
import Values from '../../shared/values';
import * as ajax from '../../modules/ajax';

// TODO: Methods below should be updated with communication with the server

const loadProjectsAlias = () => {
  return (dispatch) => {
    const { authenticated } = getState().auth;
    if(authenticated){
      ajax.loadProjects(dispatch, localData);
    }
    // else: Use local data
  };
};

const mergeProjectsAlias = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.MERGING_PROJECTS });
    const projects = [];
    const { projectList } = getState().projects;
    const { authenticated } = getState().auth;
    projectList.forEach((projectName) => {
      projects.push({projectName, ...loadcurrentProject(projectName)});
    }) // So it would become: projectName, projectNote, resources 
    if(authenticated){
      ajax.mergeProjects(dispatch, projects, ()=>{
        dispatch({
          type: ActionTypes.MERGE_PROJECTS_FULLFILLED,
        });
      });
    }
    // Only for debugging!!!!
    else {
      setTimeout(()=>{
        dispatch({
          type: ActionTypes.MERGE_PROJECTS_FULLFILLED,
        });
      }, 3000);
      setTimeout(()=>{
        dispatch({
          type: ActionTypes.POST_MERGE_PROJECTS,
        });
      }, 5000);
    }
    //
  }
}

const newProjectAlias = (req) => {
  return (dispatch, getState) => {
    const { authenticated } = getState().auth;
    const projectName = req.payload;
    if(authenticated){
      ajax.newProject(dispatch, projectName);
    } else {
      dispatch({
        type: ActionTypes.NEW_PROJECT_FULLFILLED,
        projectName,
      });
    }
  };
};

const deleteProjectAlias = (req) => {
    return (dispatch, getState) => {
      const projectName = req.payload;
      const { authenticated } = getState().auth;
      const { synchronize } = getState().preferences;
      const { projectList, currentProject } = getState().projects;
      const localUpdate = () => {
        removeProject(projectName);
      }
      if(authenticated){
        ajax.updateProject(dispatch, currentProject.projectName, updatedProj, synchronize ? localUpdate:null);
      } else{
        const projInd = projectList.indexOf(projectName);
        if (projInd > -1) projectList.splice(projInd, 1);
        localUpdate();
        dispatch({
          type: ActionTypes.DELETE_PROJECT_FULLFILLED,
          projectList,
          projectName
        });
      }
    }
}


const updateProjectAlias = (req) => {
  return (dispatch, getState) => {
    const updatedProj = req.payload;
    const { authenticated } = getState().auth;
    const { currentProject, projectList } = getState().projects;
    const { synchronize } = getState().preferences;
    const localUpdate = () => {
      if (updatedProj.projectName !== currentProject.projectName) {
        removeProject(currentProject.projectName);
        projectList[projectList.findIndex((p)=>(p==currentProject.projectName))] = updatedProj.projectName;
      }
    }
    if(authenticated){
      ajax.updateProject(dispatch, currentProject.projectName, updatedProj, synchronize ? localUpdate:null);
    } else{
      localUpdate();
      currentProject.projectName = updatedProj.projectName;
      currentProject.projectNote = updatedProj.projectNote;
      dispatch({
        type: ActionTypes.UPDATE_PROJECT_FULLFILLED,
        activeProj: updatedProj.projectName,
        currentProject,
        projectList,
      })
    }
  }
}

const addResourcesAlias = (req) => {
  return (dispatch, getState) => {
    const { authenticated } = getState().auth;
    const { currentProject } = getState().projects;
    const { tabs } = req.payload;
    if(authenticated){
      const tabResources = {};
      tabs.forEach((tab) => {
        tabResources[tab.url] = {
          url: tab.url,
          icon: tab.icon,
          title: tab.title,
          tags: [],
        };
      }); 
      ajax.addResources(dispatch,  currentProject.projectName, tabResources);
    } else{
      tabs.forEach((tab) => {
        currentProject.resources[tab.url] = {
          url: tab.url,
          icon: tab.icon,
          title: tab.title,
          tags: [],
        };
      });
      dispatch({
        type: ActionTypes.ADD_RESOURCES_FULLFILLED,
        currentProject
      });
    }
  };
};

const deleteResourcesAlias = (req) => {
  return (dispatch, getState) => {
    const { authenticated } = getState().auth;
    const { currentProject } = getState().projects;
    const { urls } = req.payload;
    if(authenticated){
      ajax.deleteResources(dispatch,  currentProject.projectName, urls);
    } else{
      urls.forEach((url) => {
        delete currentProject.resources[tab.url];
      })
      dispatch({
        type: ActionTypes.DELETE_RESOURCES_FULLFILLED,
        currentProject
      });
    }
  };
}

const loadResourcesAlias = (req) => {
  return (dispatch, getState) => {
    const projectName = req.payload;
    const { authenticated } = getState().auth;
    const { projectNote, resources } = loadcurrentProject(projectName);
    if(authenticated){
      ajax.loadResources(projectName, projectNote, resources); // Compare data and return new current proj info
    } else {
      dispatch({
        type: ActionTypes.LOAD_RESOURCES_FULLFILLED,
        currentProject: {
          projectName,
          projectNote,
          resources,
        }
      });
    }
  };
};

export default {
  LOAD_PROJECTS_REQUESTED: loadProjectsAlias,
  MERGE_PROJECTS_REQUESTED: mergeProjectsAlias,
  NEW_PROJECT_REQUESTED: newProjectAlias,
  DELETE_PROJECT_REQUESTED: deleteProjectAlias,
  UPDATE_PROJECT_REQUESTED: updateProjectAlias,

  ADD_RESOURCES_REQUESTED: addResourcesAlias,
  DELETE_RESOURCES_REQUESTED: deleteResourcesAlias,
  LOAD_RESOURCES_REQUESTED: loadResourcesAlias,
};

import ActionTypes from '../../shared/actionTypes';
import { loadProjectResources } from './localstorage';
// import * as ajax from '../../modules/ajax';

const chromeError = (dispatch, error) => {
  console.log(error);
  return dispatch({
    type: ActionTypes.CHROME_ERROR,
    error: error.toString(),
  });
};

const updateTabs = (dispatch, activeProj) => {
  try{
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const activeWindow = tabs.length ? tabs[0].windowId : -1;
      let activeTab = -1;
      const tabInfo = tabs.map((tab) => {
        if(tab.active)activeTab = tab.id;
        return ({
          icon: tab.favIconUrl,
          title: tab.title,
          id: tab.id,
          url: tab.url,
        });
      });
      dispatch({
        type: ActionTypes.GET_TABS_FULLFILLED,
        tabs: tabInfo,
        activeTab,
        activeWindow,
        activeProj,
      });
    });
  } catch(error){
    chromeError(dispatch, error);
  }
};

const getTabsAlias = (req) => {
  return (dispatch) => { updateTabs(dispatch, req.payload); };
};

const switchTabAlias = (req) => {
  return (dispatch) => {
    try{
      chrome.tabs.query({ currentWindow: true }, (tbs) => {
        tbs.forEach((tab) => {
          if (tab.active) {
            chrome.tabs.update(tab.id, { active: false });
          }
        });
        chrome.tabs.update(req.payload, { active: true });
        dispatch({
          type: ActionTypes.SWITCH_TAB_FULLFILLED,
          activeTab: req.payload,
        });
      });
    }catch(error){
      chromeError(dispatch, error);
    };
  }
};

const closeTabsAlias = (req) => {
  return (dispatch) => {
    try{
      chrome.tabs.remove(req.payload.ids, () => {
        dispatch({
          type: ActionTypes.CLOSE_TABS_FULLFILLED,
        });
        setTimeout(() => { updateTabs(dispatch, req.payload.activeProj); }, 300);
      });
    }catch(error){
      chromeError(dispatch, error);
    }
  };
};

const openTabsAlias = (req) => {
  return (dispatch) => {
    try{
      if (req.payload.urls instanceof Array) {
        req.payload.urls.forEach((url) => {
          chrome.tabs.query({ currentWindow: true, url }, (tabs) => {
            if (tabs.length === 0) chrome.tabs.create({ url });
          });// We don't want to open a url that already exists
        });
      } else {
        const url = req.payload.urls;
        chrome.tabs.query({ currentWindow: true, url }, (tabs) => {
          if (tabs.length === 0) chrome.tabs.create({ url, active: true });
          else chrome.tabs.update(tabs[0].id, { active: true });
        });
      }
      dispatch({
        type: ActionTypes.OPEN_TABS_FULLFILLED,
      });
      setTimeout(() => { updateTabs(dispatch, req.payload.activeProj); }, 200);
    }catch(error){
      chromeError(dispatch, error);
    }
  };
};

// TODO: Methods below should be updated with communication with the server

const loadProjectsAlias = () => {
  const projects = {};
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOAD_PROJECTS_FULLFILLED,
      projects,
    });
  };
};

const newProjectAlias = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.NEW_PROJECT_FULLFILLED,
      projectName: req.payload,
    });
  };
};

const updateProjectAlias = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_PROJECT_FULLFILLED,
      updatedProj: req.payload
    })
  }
}

const addResourceAlias = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_RESOURCE_FULLFILLED,
      projectName: req.payload.projectName,
      tab: req.payload.tab,
    });
  };
};

const loadResourcesAlias = (req) => {
  const { projectNote, resources } = loadProjectResources(req.payload);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOAD_RESOURCES_FULLFILLED,
      payload: {
        projectName: req.payload,
        projectNote,
        resources,
      },
    });
  };
};


export default {
  GET_TABS_REQUESTED: getTabsAlias,
  SWITCH_TAB_REQUESTED: switchTabAlias,
  CLOSE_TABS_REQUESTED: closeTabsAlias,
  OPEN_TABS_REQUESTED: openTabsAlias,

  NEW_PROJECT_REQUESTED: newProjectAlias,
  UPDATE_PROJECT_REQUESTED: updateProjectAlias,
  LOAD_PROJECTS_REQUESTED: loadProjectsAlias,
  ADD_RESOURCE_REQUESTED: addResourceAlias,
  LOAD_RESOURCES_REQUESTED: loadResourcesAlias,
};

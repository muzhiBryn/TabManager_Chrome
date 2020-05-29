import ActionTypes from '../../shared/actionTypes';
import { loadProjectResources } from './localstorage';
// import * as ajax from '../../modules/ajax';

// const backgroundError = (dispatch, error) => {
//   console.log(error);
//   return dispatch({
//     type: ActionTypes.BACKGROUND_ERRORED,
//     error: error.toString(),
//   });
// };

const updateTabs = (dispatch, activeProj) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeWindow = tabs.length ? tabs[0].windowId : -1;
    const tabInfo = tabs.map((tab) => ({
      icon: tab.favIconUrl,
      title: tab.title,
      id: tab.id,
      url: tab.url,
    }));
    dispatch({
      type: ActionTypes.GET_TABS_FULLFILLED,
      tabs: tabInfo,
      activeWindow,
      activeProj,
    });
  });
};

const getTabsAlias = (req) => {
  return (dispatch) => { updateTabs(dispatch, req.payload); };
};

const switchTabAlias = (req) => {
  return (dispatch) => {
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
  };
};

const closeTabsAlias = (req) => {
  return (dispatch) => {
    chrome.tabs.remove(req.payload.ids, () => {
      dispatch({
        type: ActionTypes.CLOSE_TABS_FULLFILLED,
      });
      setTimeout(() => { updateTabs(dispatch, req.payload.activeProj); }, 100);
    });
  };
};

const openTabsAlias = (req) => {
  return (dispatch) => {
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
    setTimeout(() => { updateTabs(dispatch, req.payload.activeProj); }, 100);
  };
};

const switchViewAlisa = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SWITCH_VIEW_FULLFILLED,
      view: req.payload,
    });
  };
};

const switchProjectAlias = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SWITCH_PROJECT_FULLFILLED,
      activeProj: req.payload,
    });
  };
};

const loadProjectsAlias = () => {
  const projects = {};// TODO: load from server? Or from local storage?
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
  const resources = loadProjectResources(req.payload);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOAD_RESOURCES_FULLFILLED,
      payload: {
        projectName: req.payload,
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
  SWITCH_PROJECT_REQUESTED: switchProjectAlias,

  NEW_PROJECT_REQUESTED: newProjectAlias,
  LOAD_PROJECTS_REQUESTED: loadProjectsAlias,
  ADD_RESOURCE_REQUESTED: addResourceAlias,
  LOAD_RESOURCES_REQUESTED: loadResourcesAlias,

  SWITCH_VIEW_REQUESTED: switchViewAlisa,
};

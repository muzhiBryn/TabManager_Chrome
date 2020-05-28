import ActionTypes from '../../shared/actionTypes';
// import * as ajax from '../../modules/ajax';

// const backgroundError = (dispatch, error) => {
//   console.log(error);
//   return dispatch({
//     type: ActionTypes.BACKGROUND_ERRORED,
//     error: error.toString(),
//   });
// };

const getTabsAlias = (req) => {
  console.log(req);
  return (dispatch) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const tabInfo = tabs.map((tab) => ({
        icon: tab.favIconUrl,
        title: tab.title,
        id: tab.id,
        url: tab.url,
      }));
      dispatch({
        type: ActionTypes.GET_TABS_FULLFILLED,
        tabs: tabInfo,
        activeProj: req.payload,
      });
    });
  };
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
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        const tabInfo = tabs.map((tab) => ({
          icon: tab.favIconUrl,
          title: tab.title,
          id: tab.id,
          url: tab.url,
        })); // load new tabs
        dispatch({
          type: ActionTypes.CLOSE_TABS_FULLFILLED,
          tabs: tabInfo,
          activeProj: req.payload.activeProj,
        });
      });
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

const switchViewAlisa = (req) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SWITCH_VIEW_FULLFILLED,
      view: req.payload,
    });
  };
};

export default {
  GET_TABS_REQUESTED: getTabsAlias,
  SWITCH_TAB_REQUESTED: switchTabAlias,
  CLOSE_TABS_REQUESTED: closeTabsAlias,
  SWITCH_PROJECT_REQUESTED: switchProjectAlias,
  LOAD_PROJECTS_REQUESTED: loadProjectsAlias,
  SWITCH_VIEW_REQUESTED: switchViewAlisa,
};

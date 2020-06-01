/* eslint-disable no-undef */
import ActionTypes from '../../shared/actionTypes';

const chromeError = (dispatch, error) => {
  console.log(error);
  return dispatch({
    type: ActionTypes.CHROME_ERROR,
    error: error.toString(),
  });
};

const updateTabs = (dispatch, activeProj, _tabs) => {
  try {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const activeWindow = tabs.length ? tabs[0].windowId : -1;
      const tabList = _tabs;
      const prevTabs = _tabs.tabList[activeWindow];
      tabList[activeWindow] = {};
      let activeTab = -1; // check active tab
      tabs.forEach((tab) => {
        if (tab.active)activeTab = tab.id;
        const project = (prevTabs && prevTabs[tab.id]) ? prevTabs[tab.id].project : activeProj;
        tabList[activeWindow][tab.id] = {
          icon: tab.favIconUrl,
          title: tab.title,
          url: tab.url,
          id: tab.id,
          project,
        };
      });
      dispatch({
        type: ActionTypes.GET_TABS_FULLFILLED,
        tabList,
        activeTab,
        activeWindow,
        activeProj,
      });
    });
  } catch (error) {
    chromeError(dispatch, error);
  }
};

const getTabsAlias = (req) => {
  return (dispatch, getState) => { updateTabs(dispatch, req.payload, getState().tabs); };
};

const switchTabAlias = (req) => {
  return (dispatch) => {
    try {
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
    } catch (error) {
      chromeError(dispatch, error);
    }
  };
};

const closeTabsAlias = (req) => {
  return (dispatch, getState) => {
    try {
      chrome.tabs.remove(req.payload.ids, () => {
        dispatch({
          type: ActionTypes.CLOSE_TABS_FULLFILLED,
        });
        setTimeout(() => { updateTabs(dispatch, req.payload.activeProj, getState().tabs); }, 200);
        setTimeout(() => { updateTabs(dispatch, req.payload.activeProj, getState().tabs); }, 500); // Well... Just in case
      });
    } catch (error) {
      chromeError(dispatch, error);
    }
  };
};

const openTabsAlias = (req) => {
  return (dispatch, getState) => {
    try {
      const { tabList, activeWindow } = getState().tabs;
      const { activeProj } = getState().projects;
      const prevTabs = tabList[activeWindow];
      const { urls } = req.payload;
      const openTab = (url, setActive) => {
        let existTab = null;
        for (const tab of Object.values(prevTabs)) {
          if (tab.url === url && tab.project === activeProj) {
            existTab = tab;
            break;
          }
        }// We don't want to open a url that already exists in the project
        if (!existTab)chrome.tabs.create({ url, active: setActive });
        else if (setActive) chrome.tabs.update(existTab.id, { active: true });
      };

      if (urls instanceof Array) {
        req.payload.urls.forEach((url) => {
          openTab(url, false);
        });
      } else {
        openTab(urls, true);
      }
      dispatch({
        type: ActionTypes.OPEN_TABS_FULLFILLED,
      });
      setTimeout(() => { updateTabs(dispatch, req.payload.activeProj, getState().tabs); }, 200);
    } catch (error) {
      chromeError(dispatch, error);
    }
  };
};

export default {
  GET_TABS_REQUESTED: getTabsAlias,
  SWITCH_TAB_REQUESTED: switchTabAlias,
  CLOSE_TABS_REQUESTED: closeTabsAlias,
  OPEN_TABS_REQUESTED: openTabsAlias,
};

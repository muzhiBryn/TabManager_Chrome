import ActionTypes from '../../../shared/actionTypes';
import { chromeError, updateTabs, chrome } from '../chrome';

const getTabsAlias = (req) => {
  return (dispatch, getState) => { updateTabs(dispatch, getState(), req.payload); };
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
        // setTimeout(() => { updateTabs(dispatch, getState(), req.payload.activeProj); }, 200);
        // setTimeout(() => { updateTabs(dispatch, getState(), req.payload.activeProj); }, 500); // Well... Just in case
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
      const { activeProj, currentProject } = getState().projects;
      const prevTabs = tabList[activeWindow];
      const { urls } = req.payload;
      const openTab = (url, setActive) => {
        let existTab = null;
        for (const tab of Object.values(prevTabs)) {
          if (tab.url === url && tab.project === activeProj) {
            existTab = tab;
            if (currentProject.resources[url]) {
              const prevResource = currentProject.resources[url];
              if (tab.title !== prevResource.title
                || tab.icon !== prevResource.icon) {
                const updatedResource = { title: tab.title, icon: tab.icon };
                dispatch({
                  type: ActionTypes.UPDATE_RESOURCE_REQUESTED,
                  payload: {
                    url, activeProj, updatedResource,
                  },
                });// Update the resource!!
              }
            }
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
      // setTimeout(() => { updateTabs(dispatch, getState(), activeProj); }, 200);
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

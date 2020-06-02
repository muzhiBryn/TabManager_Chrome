import ActionTypes from '../../shared/actionTypes';

// eslint-disable-next-line no-undef
const _chrome = chrome;

function chromeError(dispatch, error) {
  console.log(error);
  return dispatch({
    type: ActionTypes.CHROME_ERROR,
    error: error.toString(),
  });
}

// Reference: https://stackoverflow.com/questions/20958078/resize-a-base-64-image-in-javascript-without-using-canvas
// https://dev.to/tchan/web-automation-using-puppeteer-inside-a-chrome-extension-318o

function captureTab(callback) {
  try {
    _chrome.tabs.captureVisibleTab((imgUrl) => {
      if (!imgUrl) {
        callback();
        return;
      }
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // set its dimension to target size
      canvas.width = 50;
      canvas.height = 50;
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        const h = canvas.height;
        const w = (img.width * h) / img.height;
        ctx.drawImage(img, (h - w) / 2, 0, w, h);
        // encode image to data-uri with base64 version of compressed image
        callback(canvas.toDataURL());
      };
      img.onerror = () => {
        console.log(`Error loading img ${imgUrl}`);
        callback();
      };
    });
  } catch (error) {
    console.log(error);
    callback();
  }
}

function updateTabs(dispatch, prevState, _activeProj) {
  try {
    _chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const activeWindow = tabs.length ? tabs[0].windowId : -1;
      const { tabList } = prevState.tabs;
      const { projectList } = prevState.projects;
      const prevTabs = tabList[activeWindow];
      tabList[activeWindow] = {};
      const projectMap = {};
      projectList.forEach((projectName) => {
        projectMap[projectName] = 1;
      });
      const activeProj = _activeProj || prevState.projects.activeProj;
      let activeTab = -1; // check active tab
      let activeTabStatus = '';
      tabs.forEach((tab) => {
        if (tab.active) {
          activeTab = tab.id;
          activeTabStatus = tab.status;
        }
        const noChange = (prevTabs
          && prevTabs[tab.id]
          && projectMap[prevTabs[tab.id].project]
          && prevTabs[tab.id].url === tab.url);
        const project = noChange ? prevTabs[tab.id].project : activeProj;
        const screenshot = noChange ? prevTabs[tab.id].screenshot : null;
        tabList[activeWindow][tab.id] = {
          icon: tab.favIconUrl,
          title: tab.title,
          url: tab.url,
          id: tab.id,
          project,
          screenshot,
        };
      });
      if (activeTab !== -1 && activeTabStatus === 'complete') { // Only capture when the active tab has been loaded
        captureTab((screenshot) => {
          tabList[activeWindow][activeTab].screenshot = screenshot;
          dispatch({
            type: ActionTypes.GET_TABS_FULLFILLED,
            tabList,
            activeTab,
            activeWindow,
            activeProj,
          });
        });
      } else {
        dispatch({
          type: ActionTypes.GET_TABS_FULLFILLED,
          tabList,
          activeTab,
          activeWindow,
          activeProj,
        });
      }
    });
  } catch (error) {
    chromeError(dispatch, error);
  }
}

export {
  chromeError,
  updateTabs,
  _chrome as chrome,
};

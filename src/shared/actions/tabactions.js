import ActionTypes from '../actionTypes';

export function requestOpenTabs(urls, activeProj) {
  return {
    type: ActionTypes.OPEN_TABS_REQUESTED,
    payload: {
      urls,
      activeProj,
    },
  };
}

export function requestGetTabs(activeProj) {
  return {
    type: ActionTypes.GET_TABS_REQUESTED,
    payload: activeProj,
  };
}

export function requestCloseTabs(ids, activeProj) {
  return {
    type: ActionTypes.CLOSE_TABS_REQUESTED,
    payload: {
      ids,
      activeProj,
    },
  };
}

export function requestSwitchTab(id) {
  return {
    type: ActionTypes.SWITCH_TAB_REQUESTED,
    payload: id,
  };
}

export function moveTab(movingTab) {
  return {
    type: ActionTypes.MOVE_TAB,
    movingTab,
  };
}

export function updateTabProj(tabId, project) {
  return {
    type: ActionTypes.UPDATE_TAB_PROJ,
    tabId,
    project,
  };
}

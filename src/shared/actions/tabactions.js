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
  console.log('request close a tab');
  return {
    type: ActionTypes.CLOSE_TABS_REQUESTED,
    payload: {
      ids,
      activeProj,
    },
  };
}

export function requestSwitchTab(id) {
  console.log('request switch a tab');
  return {
    type: ActionTypes.SWITCH_TAB_REQUESTED,
    payload: id,
  };
}

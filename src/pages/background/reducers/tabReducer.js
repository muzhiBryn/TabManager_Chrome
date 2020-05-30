import ActionTypes from '../../../shared/actionTypes';

const updateTabs = (newTabList, prevTabs, activeProj) => {
  const tempTabs = {};
  newTabList.forEach((tab) => {
    tempTabs[tab.id] = { project: activeProj, ...tab };
    if (prevTabs && prevTabs[tab.id]) tempTabs[tab.id].project = prevTabs[tab.id].project;
  });
  return tempTabs;
};

export default function tabReducer(state = {}, action) {
  const tabList = state.tabList;
  switch (action.type) {
    case ActionTypes.CHROME_ERROR:
      console.log(action.error);
      return state;
    case ActionTypes.GET_TABS_FULLFILLED:
      if (!action.activeWindow || action.activeWindow==-1) return state;   
      tabList[action.activeWindow] = updateTabs(action.tabs, state.tabList[action.activeWindow], action.activeProj);
      return {...state, tabList, activeWindow: action.activeWindow, activeTab: action.activeTab};
    case ActionTypes.SWITCH_TAB_FULLFILLED:
      return { ...state, activeTab: action.activeTab };
    case ActionTypes.MOVE_TAB:
      return { ...state, movingTab: action.movingTab };
    case ActionTypes.UPDATE_TAB_PROJ:
      state.tabList[state.activeWindow][action.tabId].project = action.project;
      return {...state, tabList};
    default:
      return state;
  }
}

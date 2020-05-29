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
  switch (action.type) {
    // case ActionTypes.GET_TABS_ERRORED:
    //   console.log(action.payload);
    //   return state;
    case ActionTypes.GET_TABS_FULLFILLED:
      if (!action.activeWindow) return state;
      return {
        ...state,
        activeWindow: action.activeWindow,
        tabList: { ...state.tabList, [action.activeWindow]: updateTabs(action.tabs, state.tabList[action.activeWindow], action.activeProj) },
      };
    case ActionTypes.SWITCH_TAB_FULLFILLED:
      return { ...state, activeTab: action.activeTab };
    default:
      return state;
  }
}

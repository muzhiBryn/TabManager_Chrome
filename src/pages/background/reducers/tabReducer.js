import ActionTypes from '../../../shared/actionTypes';

export default function tabReducer(state = {}, action) {
  const newState = state;
  switch (action.type) {
    case ActionTypes.CHROME_ERROR:
      console.log(action.error);
      return state;
    case ActionTypes.GET_TABS_FULLFILLED:
      if (!action.activeWindow || action.activeWindow === -1) return state;
      return {
        ...state, tabList: action.tabList, activeWindow: action.activeWindow, activeTab: action.activeTab,
      };
    case ActionTypes.SWITCH_TAB_FULLFILLED:
      return { ...state, activeTab: action.activeTab };
    case ActionTypes.MOVE_TAB:
      return { ...state, movingTab: action.movingTab };
    case ActionTypes.UPDATE_TAB_PROJ:
      newState.tabList[state.activeWindow][action.tabId].project = action.project;
      return { ...newState };
    default:
      return state;
  }
}

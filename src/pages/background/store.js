import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import aliases from './aliases';
import reducer from './reducers/index';

const logger = createLogger({
  collapsed: true,
});

const initialState = {
  tabs: {
    tabList: {},
    activeTab: -1,
    movingTab: null,
  },
  projects: {
    projectList: ['General', 'Other'],
    projectResouces: [],
    activeProj: 'General',
  },
  preferences: {
    displayType: '0', // List view
  },
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    alias(aliases),
    thunk,
    logger, // NOTE: logger _must_ be last in middleware chain
  ),
);

wrapStore(store, {
  portName: 'Tabs Comminication',
});

export default store;

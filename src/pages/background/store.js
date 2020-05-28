import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import aliases from './aliases';
import { loadProjects, saveProjects } from './localstorage';
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
  projects: loadProjects(),
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

store.subscribe(throttle(() => {
  saveProjects(store.getState().projects);
}, 1000));

export default store;

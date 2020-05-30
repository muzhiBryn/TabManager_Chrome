import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import aliases from './aliases';
import {
  loadProjectList, loadPreferences, saveProjectList, saveProjectResources, savePreferences,
} from './localstorage';
import reducer from './reducers/index';

const logger = createLogger({
  collapsed: true,
});

const initialState = {
  tabs: {
    tabList: {},
    activeTab: -1,
    activeWindow: -1,
    movingTab: null,
  },
  projects: {
    projectList: loadProjectList(),
    projectResources: { projectName: '', projectNote: '', resources: {} },
    activeProj: 'General',
  },
  preferences: loadPreferences(),
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
  saveProjectList(store.getState().projects.projectList);
  // console.log(store.getState().preferences);
  savePreferences(store.getState().preferences);
  const { projectResources, activeProj } = store.getState().projects;
  if (projectResources.projectName === activeProj) saveProjectResources(projectResources.projectName, projectResources.projectNote, projectResources.resources);
}, 1000));

export default store;

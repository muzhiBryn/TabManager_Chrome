/* eslint-disable no-unused-vars */
import axios from 'axios';
import throttle from 'lodash.throttle';
import store from './store';
import { updateTabs, chrome } from './chrome';

// chrome.tabs.onCreated.addListener(() => { updateTabs(store.dispatch, store.getState()); });
chrome.tabs.onUpdated.addListener(() => { updateTabs(store.dispatch, store.getState()); });
chrome.tabs.onRemoved.addListener(() => { updateTabs(store.dispatch, store.getState()); });

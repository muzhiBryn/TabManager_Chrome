import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import App from './components/app';

const store = new Store({
  portName: 'Tabs Comminication',
});

store.ready().then(() => {
  // const mountNode = document.createElement('div');
  // document.body.appendChild(mountNode);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    // mountNode
  );
});

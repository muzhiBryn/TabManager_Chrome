/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

// Reference: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/inspector/tabs_api.js
// const e = React.createElement; // Basically it takes the place of tags(<>)
// eslint-disable-next-line no-undef
const port = chrome.extension.connect({
  name: 'Tabs Comminication',
});

const jumpto = (id) => {
  port.postMessage(JSON.stringify({ head: 'select', id }));
};

// const close = (id) => {
//   port.postMessage(JSON.stringify({ head: 'close', id }));
// };

// const openTab = (url) => {
//   port.postMessage(JSON.stringify({ head: 'open_tab', url }));
// };

// const openTabs = (urls) => {
//   port.postMessage(JSON.stringify({ head: 'open_tabs', urls }));
// };

class TabManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
    };
    this.updateTabs = this.updateTabs.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.jumpto = this.jumpto.bind(this);
    this.openTab = this.openTab.bind(this);
  }

  componentDidMount() {
    port.onMessage.addListener(this.handleMessage);
  }

  componentWillUnmount() {
    port.onMessage.removeListener(this.handleMessage);
  }

  updateTabs(tabs) {
    this.setState({
      tabs,
    });
  }

  handleMessage(msg) {
    const query = JSON.parse(msg);
    switch (query.head) {
      case 'tabs':
        this.updateTabs(query.tabs);
        break;
      default:
        break;
    }
  }

  render() {
    const testTabsUrlInFolder = this.state.tabs.map((tab) => {
      return tab.url;
    });
    console.log(testTabsUrlInFolder);

    // ATTENTION!!! Here we provided 4 fuctions: jumpto, openTab, openTabs and close.
    // This is an example of how the client can use them.

    const tabs = this.state.tabs.map((tab) => {
      return (
        <li title={tab.title}
          onClick={() => {
            jumpto(tab.id);
          }}
            // openTab(tab.url);
            // openTabs(testTabsUrlInFolder);
            // close(tab.id);
        >
          <img alt="icon" src={tab.icon} />
          <span>{tab.title}</span>
          <i className="btn fa fa-window-close" onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; this.close(tab.id); }} />
        </li>
      );
    });
    return (<ul>{tabs}</ul>);
  }
}

export default TabManager;

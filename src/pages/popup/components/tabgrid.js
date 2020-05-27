/* eslint-disable no-param-reassign */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TabGrid = (props) => {
  // ATTENTION!!! Here we provided 4 fuctions: jumpto, openTab, openTabs and close.
  // This is an example of how the client can use them.
  const {
    tabs, jumpto, close,
  } = props;
  const tabList = tabs.map((tab) => {
    return (
      <li
        key={tab.id}
        title={tab.title}
        onClick={() => {
          jumpto(tab.id);
          // this.openTab(tab.url);
          // this.openTabs(testTabsUrlInFolder);
          // this.close(tab.id);
        }}
      >
        <img alt="icon" src={tab.icon} />
        <span>{tab.title}</span>
        <FontAwesomeIcon className="btn" icon="window-close" onClick={(event) => { event.stopPropagation(); event.cancelBubble = true; close(tab.id); }} />
      </li>
    );
  });
  return <ul id="tab-grid">{tabList}</ul>;
};
export default TabGrid;

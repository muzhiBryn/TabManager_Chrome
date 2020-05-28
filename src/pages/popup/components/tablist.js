/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestSwitchTab, requestCloseTabs } from '../../../shared/actions/tabActions';

const TabList = (props) => {
  // ATTENTION!!! Here we provided 4 fuctions: jumpto, openTab, openTabs and close.
  // This is an example of how the client can use them.
  const {
    tabs,
  } = props;
  const tabList = tabs.map((tab) => {
    return (
      <li
        key={tab.id}
        title={tab.title}
        onClick={() => {
          props.requestSwitchTab(tab.id);
        }}
      >
        <img alt=" " src={tab.icon} />
        <span>{tab.title}</span>
        <FontAwesomeIcon
          className="btn"
          icon="window-close"
          onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; props.requestCloseTabs(tab.id, props.activeProj); }}
        />
      </li>
    );
  });
  return <ul id="tab-list">{tabList}</ul>;
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestSwitchTab, requestCloseTabs })(TabList);

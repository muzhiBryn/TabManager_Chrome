/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestSwitchTab, requestCloseTabs, moveTab } from '../../../shared/actions/tabactions';
import { requestAddResource } from '../../../shared/actions/projectactions';

const TabGrid = (props) => {
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
        onMouseDown={(e) => { e.preventDefault(); props.moveTab({ tab, x: e.pageX, y: e.pageY }); }}
        onMouseUp={() => {
          props.requestSwitchTab(tab.id);
        }}
      >
        <img alt=" " src={tab.icon} />
        <span>{tab.title}</span>
        {props.editing ? (
          <FontAwesomeIcon
            className="btn"
            icon="save"
            onMouseDown={(e) => { e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; props.requestAddResource(tab, props.activeProj); }}
          />
        ) : null}
        <FontAwesomeIcon
          className="btn"
          icon="window-close"
          onMouseDown={(e) => { e.stopPropagation(); }}
          onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; props.requestCloseTabs(tab.id, props.activeProj); }}
        />
      </li>
    );
  });
  return <ul id="tab-grid"> I am the grid view {tabList}</ul>;
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, {
  requestSwitchTab, requestCloseTabs, requestAddResource, moveTab,
})(TabGrid);

/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import ListTab from './listtab';
import GridTab from './gridtab';

const TabView = (props) => {
  const {
    tabs,
    editing,
  } = props;
  const tabItems = tabs.map((tab) => (
    props.displayType === '1'
      ? <ListTab tab={tab} key={tab.id} editing={editing} />
      : <GridTab key={tab.id} tab={tab} editing={editing} />
  ));
  return <ul id={props.displayType === '1' ? 'tab-grid' : 'tab-list'}>{tabItems}</ul>;
};

const mapStateToProps = (reduxState) => ({
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, null)(TabView);

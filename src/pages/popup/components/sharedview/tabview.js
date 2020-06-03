/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import ListTab from './listtab';
import GridTab from './gridtab';
import '../../scss/tabview.scss';

const TabView = (props) => {
  const {
    tabs,
    editing,
  } = props;
  const tabItems = tabs.map((tab) => (
    props.displayType === '0'
      ? <ListTab key={tab.id} tab={tab} editing={editing} />
      : <GridTab key={tab.id} tab={tab} editing={editing} />
  ));
  if (tabItems.length === 0) {
    tabItems.push(<div key={0}>No tab is opened in this project or none of the tabs fits the filter </div>);
  }
  return <ul id={props.displayType === '1' ? 'tab-grid' : 'tab-list'}>{tabItems}</ul>;
};

const mapStateToProps = (reduxState) => ({
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, null)(TabView);

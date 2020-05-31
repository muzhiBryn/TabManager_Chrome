/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplaySetting from './displayset';
import TabGrid from './tabgrid';
import TabList from './tablist';
import ProjectList from './projectlist';
import { requestGetTabs } from '../../../shared/actions/tabactions';

class TabManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    const { tabs, activeProj } = this.props;
    if (tabs.size === undefined) {
      console.log(activeProj);
      this.props.requestGetTabs(activeProj);
    }
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  render() {
    let tabView;
    const tabShow = [];
    Object.values(this.props.tabs).forEach((tab) => {
      if (tab.project !== this.props.activeProj) return;
      let flag = true;
      Object.keys(this.state.filter).forEach((key) => {
        if (!tab[key].toLowerCase().includes(this.state.filter[key].toLowerCase()))flag = false;
      });
      if (flag) tabShow.push(tab);
    });
    switch (this.props.displayType) {
      case '1':
        tabView = (<TabGrid tabs={tabShow} filter={this.state.filter} />);
        break;
      default:
        tabView = (<TabList tabs={tabShow} filter={this.state.filter} />);
        break;
    }

    return (
      <div id="tabview">
        <DisplaySetting setFilter={this.setFilter} switchView={this.props.requestSwitchView} />
        { tabView }
        <ProjectList />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  tabs: reduxState.tabs.tabList,
  activeProj: reduxState.projects.activeProj,
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, { requestGetTabs })(TabManager);

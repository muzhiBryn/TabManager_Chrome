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
    // const { activeWindow, activeProj } = this.props;
    // if (activeWindow === -1) {
    //   console.log(activeProj);
    //   this.props.requestGetTabs(activeProj);
    // }
    const { activeProj } = this.props;
    this.props.requestGetTabs(activeProj);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  render() {
    let tabView;
    const tabShow = [];
    const projectOverview = {};
    this.props.projectList.forEach((project) => {
      projectOverview[project] = { example: '', ids: [], contains: false };
    });
    if (this.props.activeWindow !== -1) {
      Object.values(this.props.tabs[this.props.activeWindow]).forEach((tab) => {
        projectOverview[tab.project].ids.push(tab.id);
        if (projectOverview[tab.project].example === '')projectOverview[tab.project].example = tab.title;
        let flag = true;
        Object.keys(this.state.filter).forEach((key) => {
          if (!tab[key].toLowerCase().includes(this.state.filter[key].toLowerCase()))flag = false;
        });
        if (!flag) return;
        if (Object.keys(this.state.filter).length)projectOverview[tab.project].contains = true; // Contains tabs that fits the filter
        if (tab.project === this.props.activeProj) {
          tabShow.push(tab);
        }
      });
    }
    switch (this.props.displayType) {
      case '1':
        tabView = (<TabGrid tabs={tabShow} filter={this.state.filter} />);
        break;
      default:
        tabView = (<TabList tabs={tabShow} filter={this.state.filter} />);
        break;
    }

    return (
      <div>
        <DisplaySetting setFilter={this.setFilter} switchView={this.props.requestSwitchView} />
        { tabView }
        <ProjectList projectOverview={projectOverview} />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  tabs: reduxState.tabs.tabList,
  activeWindow: reduxState.tabs.activeWindow,
  projectList: reduxState.projects.projectList,
  activeProj: reduxState.projects.activeProj,
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, { requestGetTabs })(TabManager);

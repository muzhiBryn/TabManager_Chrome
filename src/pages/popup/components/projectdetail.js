import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DisplaySetting from './sharedview/displayset';
import ProjectEditor from './detailview/projecteditor';
import TabView from './sharedview/tabview';
import ResourceList from './detailview/resourcelist';
import { requestGetTabs } from '../../../shared/actions/tabactions';
import { requestLoadResources, switchProject } from '../../../shared/actions/projectactions';


class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };
    // Tabs could be edited seperately
    // Read tabs from props
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    const { activeProj } = this.props;
    const newActive = this.props.match.params.proj.substr(1);
    console.log(newActive);
    if (activeProj !== newActive) {
      this.props.switchProject(newActive);
    }
    this.props.requestGetTabs(activeProj);
    this.props.requestLoadResources(newActive);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  render() {
    const { activeWindow, activeProj, tabs } = this.props;
    const tabShow = [];
    if (activeWindow !== -1) {
      Object.values(tabs[activeWindow]).forEach((tab) => {
        if (tab.project !== activeProj) return;
        let flag = true;
        Object.keys(this.state.filter).forEach((key) => {
          if (!tab[key].toLowerCase().includes(this.state.filter[key].toLowerCase()))flag = false;
        });
        if (flag) tabShow.push(tab);
      });
    }
    return (
      <div>
        <NavLink to="/">Back</NavLink>
        <DisplaySetting setFilter={this.setFilter} switchView={this.props.requestSwitchView} />
        <ProjectEditor />
        <TabView editing tabs={tabShow} filter={this.state.filter} />
        <ResourceList />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  tabs: reduxState.tabs.tabList,
  activeWindow: reduxState.tabs.activeWindow,
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestGetTabs, requestLoadResources, switchProject })(ProjectDetail);

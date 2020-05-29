/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DisplaySetting from './displayset';
import TabGrid from './tabgrid';
import TabList from './tablist';
import ResourceList from './resourcelist';
import { requestGetTabs } from '../../../shared/actions/tabactions';
import { requestLoadResources, switchProject } from '../../../shared/actions/projectactions';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    const { activeProj } = this.props;
    const newActive = this.props.match.params.proj.substr(1);
    console.log(newActive);
    if (activeProj !== newActive) {
      this.props.switchProject(newActive);
    }
    // if (activeWindow === -1) {
    this.props.requestGetTabs(activeProj);
    // }
    this.props.requestLoadResources(newActive);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  render() {
    let tabView;
    const tabShow = [];
    if (this.props.activeWindow !== -1) {
      Object.values(this.props.tabs[this.props.activeWindow]).forEach((tab) => {
        if (tab.project !== this.props.activeProj) return;
        let flag = true;
        Object.keys(this.state.filter).forEach((key) => {
          if (!tab[key].toLowerCase().includes(this.state.filter[key].toLowerCase()))flag = false;
        });
        if (flag) tabShow.push(tab);
      });
    }
    switch (this.props.displayType) {
      case '1':
        tabView = (<TabGrid editing tabs={tabShow} filter={this.state.filter} />);
        break;
      default:
        tabView = (<TabList editing tabs={tabShow} filter={this.state.filter} />);
        break;
    }

    return (
      <div>
        <NavLink to="/">Back</NavLink>
        <DisplaySetting setFilter={this.setFilter} switchView={this.props.requestSwitchView} />
        { tabView }
        <ResourceList />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  tabs: reduxState.tabs.tabList,
  activeWindow: reduxState.tabs.activeWindow,
  activeProj: reduxState.projects.activeProj,
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, { requestGetTabs, requestLoadResources, switchProject })(ProjectDetail);

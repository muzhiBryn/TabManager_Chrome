/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DisplaySetting from './displayset';
import TabGrid from './tabgrid';
import TabList from './tablist';
import ResourceList from './resourcelist';

const port = chrome.extension.connect({
  name: 'Tabs Comminication',
});

const jumpto = (id) => {
  port.postMessage(JSON.stringify({ head: 'select', id }));
};

const close = (id) => {
  port.postMessage(JSON.stringify({ head: 'close', id }));
};

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {},
      projects: ['General', 'Other'],
      displayType: 0, // Grid view
      activeProj: props.match.params.proj,
      movingTab: null,
      filter: {},
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.switchView = this.switchView.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      activeProj: prevState.activeProj,
    }));
    port.onMessage.addListener(this.handleMessage);
  }

  componentWillUnmount() {
    port.onMessage.removeListener(this.handleMessage);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  switchView(type) {
    this.setState({ displayType: type });
  }

  updateTabs(tabs) {
    const tempTabs = {};
    tabs.forEach((tab) => {
      tempTabs[tab.id] = { project: this.state.activeProj, ...tab };
      if (this.state.tabs[tab.id]) tempTabs[tab.id].project = this.state.tabs[tab.id].project;
    });
    this.setState({ tabs: tempTabs });
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
    let tabView;
    const tabShow = [];
    Object.values(this.state.tabs).forEach((tab) => {
      if (tab.project !== this.state.activeProj) return;
      let flag = true;
      Object.keys(this.state.filter).forEach((key) => {
        if (!tab[key].toLowerCase().includes(this.state.filter[key].toLowerCase()))flag = false;
      });
      if (flag) tabShow.push(tab);
    });
    switch (this.state.displayType) {
      case 1:
        tabView = (<TabGrid tabs={tabShow} filter={this.state.filter} jumpto={jumpto} close={close} />);
        break;
      default:
        tabView = (<TabList tabs={tabShow} filter={this.state.filter} jumpto={jumpto} close={close} />);
        break;
    }

    return (
      <div>
        <NavLink exact to="/">Go Back</NavLink>
        <DisplaySetting setFilter={this.setFilter} switchView={this.switchView} />
        { tabView }
        <ResourceList projects={this.state.projects} tabs={this.state.tabs} switchProject={this.switchProject} dragOutTab={this.dragOutTag} movingTab={this.state.movingTab} />
      </div>
    );
  }
}

export default ProjectDetail;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Values from '../../../shared/values';
import ProjectEditor from './detailview/projecteditor';
import TabView from './sharedview/tabview';
import ResourceView from './detailview/resourceview';
import Footer from './sharedview/footer';
import { requestGetTabs } from '../../../shared/actions/tabactions';
import { requestLoadResources, requestDeleteProject, switchProject } from '../../../shared/actions/projectactions';


class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteRequested: 0,
    };
    // Tabs could be edited seperately
    // Read tabs from props
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  componentDidMount() {
    const { activeProj } = this.props;
    const newActive = this.props.match.params.proj.substr(1);
    if (activeProj !== newActive) {
      this.props.switchProject(newActive);
    }
    this.props.requestGetTabs(activeProj);
    this.props.requestLoadResources(newActive);
  }

  handleDeleteProject() {
    this.setState({ deleteRequested: 1 });
    this.props.requestDeleteProject(this.props.activeProj);
  }

  render() {
    const { activeWindow, activeProj, tabs } = this.props;
    const tabShow = [];
    if (activeProj === Values.defaultProject && this.state.deleteRequested) {
      return <Redirect to="/" />;
    }
    if (activeWindow !== -1) {
      Object.values(tabs[activeWindow]).forEach((tab) => {
        if (tab.project !== activeProj) return;
        tabShow.push(tab);
      });
    }
    const back = <Link to="/">Back</Link>;
    return (
      <div id="project-detail">
        {/* <DisplaySetting setFilter={this.setFilter} switchView={this.props.requestSwitchView} /> */}
        <ProjectEditor back={back} />
        <TabView editing tabs={tabShow} filter={this.state.filter} />
        <ResourceView />
        <button type="button" onClick={this.handleDeleteProject}>Delete Project</button>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  tabs: reduxState.tabs.tabList,
  activeWindow: reduxState.tabs.activeWindow,
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, {
  requestGetTabs, requestDeleteProject, requestLoadResources, switchProject,
})(ProjectDetail);

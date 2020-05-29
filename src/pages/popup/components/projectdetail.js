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
      isEditing: false,
      updatedPoroject: {
        title: '',
        content: '',
        tabs: '',
      },
      filter: {},
    };
    this.setFilter = this.setFilter.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderTabs = this.renderTags.bind(this);
    // this. onTitleChange = this.onTitleChange.bind(this);
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

  onEditClick = (event) => {
    if (this.state.isEditing) {
     //this.props.updateProject(this.props.currentProject._id, this.state.updatedProject);
      this.setState({ isEditing: false });
    } else {
      this.setState({
        // updatedProject: {
        //   title: this.props.currentProject.title,
        //   content: this.props.currentProject.content,
        //   tagb: this.props.currentProject.tabs,
        // },
      });
      this.setState({ isEditing: true });
    }
  }

  renderEdit() {
    return (
      <button type="button" onClick={this.onEditClick} className="note-button"><i className="far fa-edit fa-2x" /></button>

    );
  }

  // onTitleChange(event) {
  //   this.setState({
  //     // eslint-disable-next-line react/no-access-state-in-setstate
  //     updatedPost: Object.assign({}, this.state.updatedProject, { title: event.target.value }),
  //   });
  //   //this.props.updateProject(this.props.currentProject._id, this.state.updatedProject);
  // }


  renderTitle() {
    if (this.state.isEditing) {
      return (
        <div>
          <h3>Title</h3>
          
          <input id="title-change" type="text"  placeholder="update title" /> 

          {this.renderEdit()}
        </div>
      );
    } else {
      return (
        <div className="title">
          {/* <h1 className="project-title">{this.props.currentProject.title}</h1> */}
          <h1 className="project-title">Project1</h1>
          {this.renderEdit()}
        </div>
      );
    }
  }

  renderContent() {
    if (this.state.isEditing) {
      return (
        <div>
          <h3>Content</h3>
          <input id="content-change" type="text"  placeholder="update description" /> 
          {/* <input id="content-change" type="text" onChange={this.onContentChange} placeholder="update content" value={this.state.updatedPoroject.content} /> */}
        </div>
      );
    } else {
      return (
        <div className="background">
          {/* <p className="proejct-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPoroject.content || '') }} /> */}
        </div>
      );
    }
  }

  renderTags() {
    if (this.state.isEditing) {
      return (
        <div>
          <h3>Tags</h3>
          {/* <input id="tag-change" type="text" onChange={this.onTagsChange} placeholder="update tags" value={this.state.updatedPoroject.tags} /> */}
        </div>
      );
    } else {
      return (
        <div className="background">
          {/* <p className="project-tags">{this.props.currentPoroject.tags}</p> */}
        </div>
      );
    }
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
  
        {this.renderTitle()} 
        {this.renderContent()}
        {this.renderTabs()}
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

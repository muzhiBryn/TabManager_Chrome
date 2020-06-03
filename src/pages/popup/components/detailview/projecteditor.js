import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestUpdateProject } from '../../../../shared/actions/projectactions';

class ProjectEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      updatedProject: {
        projectName: '',
        projectNote: '',
      },
    };
    this.renderEdit = this.renderEdit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
  }

  onEditClick(event) {
    const { isEditing, updatedProject } = this.state;
    const { projectList, currentProject } = this.props;
    if (isEditing) {
      if (updatedProject.projectName !== currentProject.projectName && projectList.includes(updatedProject.projectName)) {
        console.log('exists!');
        // Todo: show the message!
        return;
      } else if (updatedProject.projectName === currentProject.projectName
        && updatedProject.projectNote === currentProject.projectNote) {
        console.log('Nothing changed');
        this.setState({ isEditing: false });
        return;
      }
      this.props.requestUpdateProject(updatedProject);
      this.setState({ isEditing: false });
    } else {
      this.setState({
        updatedProject: {
          projectName: currentProject.projectName,
          projectNote: currentProject.projectNote,
        },
      });
      this.setState({ isEditing: true });
    }
  }

  onNameChange(event) {
    const projectName = event.target.value;
    this.setState((prevState) => ({
      updatedProject: { ...prevState.updatedProject, projectName },
    }));
  }

  onNoteChange(event) {
    const projectNote = event.target.value;
    this.setState((prevState) => ({
      updatedProject: { ...prevState.updatedProject, projectNote },
    }));
  }

  renderEdit() {
    return (
      <button type="button" onClick={this.onEditClick} className="note-button"><FontAwesomeIcon icon={['far', 'edit']} size="2x" /> </button>
    );
  }

  renderTitle() {
    const { currentProject } = this.props;
    if (this.state.isEditing) {
      return (
        <div>
          <h3>Title</h3>
          <input id="projectName-change" type="text" onChange={this.onNameChange} value={this.state.updatedProject.projectName} placeholder="update projectName" />
          {this.renderEdit()}
        </div>
      );
    } else {
      return (
        <div className="projectName">
          {/* <h1 className="project-projectName">{this.props.currentProject.projectName}</h1> */}
          <h1 className="project-name">{ currentProject.projectName }</h1>
          {this.props.back}
          {this.renderEdit()}
        </div>
      );
    }
  }

  renderNote() {
    const { currentProject } = this.props;
    if (this.state.isEditing) {
      return (
        <div>
          <h3>Note</h3>
          <input id="note-change" type="text" onChange={this.onNoteChange} placeholder="update note" value={this.state.updatedProject.projectNote} />
        </div>
      );
    } else {
      return (
        <div className="background">
          {/* <p className="project-note" dangerouslySetInnerHTML={{ __html: marked(currentProject.note || '') }} /> */}
          <p className="project-note">{ currentProject.projectNote }</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderNote()}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  currentProject: reduxState.projects.currentProject,
  projectList: reduxState.projects.projectList,
});

export default connect(mapStateToProps, { requestUpdateProject })(ProjectEditor);

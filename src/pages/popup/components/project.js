/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestSwitchProject } from '../../../shared/actions/projectactions';

const Project = (props) => {
  const { projectTitle } = props;
  const style = projectTitle === props.activeProj ? { backgroundColor: 'yellow' } : {};
  return (
    <li style={style} onClick={() => { props.requestSwitchProject(projectTitle); }}>
      {projectTitle}
      <button id="submit"><NavLink exact to={`/project/:${projectTitle}`}>Edit</NavLink></button>
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestSwitchProject })(Project);

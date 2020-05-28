/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestSwitchProject } from '../../../shared/actions/projectActions';

const Project = (props) => {
  const { projectTitle } = props;
  return (
    <li onClick={() => { props.requestSwitchProject(projectTitle); }}>
      {projectTitle}
      <button><NavLink exact to={`/project/:${projectTitle}`}>Edit</NavLink></button>
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
}); // Maybe display it differently?

export default connect(mapStateToProps, { requestSwitchProject })(Project);

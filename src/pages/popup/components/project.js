/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Project = (props) => {
  const { switchProject, projectTitle } = props;
  return (
    <li onClick={() => { switchProject(projectTitle); }}>
      {projectTitle}
      <button onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; }}><NavLink exact to={`/project/:${projectTitle}`}>Edit</NavLink></button>
    </li>
  );
};

export default Project;

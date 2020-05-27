import React from 'react';

const Project = (props) => {
  const { switchProject, projectTitle } = props;
  return (
    <li onClick={() => { switchProject(projectTitle); }}>{projectTitle}</li>
  );
};

export default Project;

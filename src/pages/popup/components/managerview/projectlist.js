/* eslint-disable react/button-has-type */
import React from 'react';
import Project from './project';

const ProjectList = (props) => {
  const { projectOverview } = props;
  const projectView = Object.keys(projectOverview).map((project) => {
    return (
      <Project
        key={`project-${project}`}
        projectTitle={project}
        example={projectOverview[project].example}
        contains={projectOverview[project].contains}
        ids={projectOverview[project].ids}
      />
    );
  });
  return (
    <ul id="project-list">
      {projectView}
    </ul>
  );
};

export default ProjectList;

import React from 'react';
import Project from './project';

// eslint-disable-next-line no-unused-vars
const ProjectList = (props) => {
  const {
    projects, tabs, switchProject, dragOutTab, movingTab,
  } = props;
  const tabMap = {};
  projects.forEach((project) => {
    tabMap[project] = [];
  });
  Object.values(tabs).forEach((tab) => {
    tabMap[tab.project].push(tab);
  });
  const projectLi = Object.keys(tabMap).map((project) => {
    return (
      <Project
        key={`project-${project}`}
        projectTitle={project}
        tabs={tabMap[project]}
        switchProject={switchProject}
        dragOutTab={dragOutTab}
        movingTab={movingTab}
      />
    );
  });
  return <ul id="project-list">{projectLi}</ul>;
};

export default ProjectList;

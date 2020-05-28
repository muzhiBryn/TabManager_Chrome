import React from 'react';
import { connect } from 'react-redux';
import Project from './project';

// eslint-disable-next-line no-unused-vars
const ProjectList = (props) => {
  const projectView = props.projects.map((project) => {
    return (
      <Project
        key={`project-${project}`}
        projectTitle={project}
      />
    );
  });
  return <ul id="project-list">{projectView}</ul>;
};


const mapStateToProps = (reduxState) => ({
  projects: reduxState.projects.projectList,
});

export default connect(mapStateToProps, null)(ProjectList);

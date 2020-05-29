/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestSwitchProject } from '../../../shared/actions/projectactions';
import { requestCloseTabs } from '../../../shared/actions/tabactions';

const Project = (props) => {
  const { projectTitle, example, ids } = props;
  const exampleTrim = example.length > 35 ? `${example.substr(0, 32)}...` : example;
  const style = projectTitle === props.activeProj ? { backgroundColor: 'yellow' } : {};
  return (
    <li style={style} onClick={() => { props.requestSwitchProject(projectTitle); }}>
      {projectTitle}&nbsp;
      {example ? `: ${exampleTrim} ` : ''}
      {ids.length > 1 ? `and ${ids.length - 1} other tabs ` : ''}
      {projectTitle === 'General' ? null : <button><NavLink exact to={`/project/:${projectTitle}`}>Edit</NavLink></button> }
      {ids.length > 0 ? (
        <FontAwesomeIcon
          className="btn"
          icon="window-close"
          onClick={(e) => { e.stopPropagation(); e.cancelBubble = true; props.requestCloseTabs(ids, props.activeProj); }}
        />
      ) : null}
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestSwitchProject, requestCloseTabs })(Project);

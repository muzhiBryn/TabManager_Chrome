import React from 'react';
import { connect } from 'react-redux';
import { requestOpenTabs } from '../../../shared/actions/tabactions';

// eslint-disable-next-line no-unused-vars
const ResourceList = (props) => {
  // To do
  return (
    <ul id="resource-list">
      {
        Object.values(props.resources).map((tab) => {
          return <li key={tab.url} onClick={() => { props.requestOpenTabs(tab.url, props.activeProj); }}>{ tab.title }</li>;
        })
      }
      <button type="button" onClick={() => { props.requestOpenTabs(Object.keys(props.resources), props.activeProj); }}>Open All </button>
      <button type="button">Should Delete Project</button>
    </ul>
  );
};

const mapStateToProps = (reduxState) => ({
  resources: reduxState.projects.projectResources.resources,
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestOpenTabs })(ResourceList);

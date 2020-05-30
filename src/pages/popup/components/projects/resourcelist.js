import React from 'react';
import { connect } from 'react-redux';
import Rescource from './resource';
import { requestOpenTabs } from '../../../../shared/actions/tabactions';

const ResourceList = (props) => {
  const { resources, activeProj } = props;
  return (
    <ul id="resource-list">
      {
        Object.values(resources).map((tab) => {
          return <Rescource key={tab.id} tab={tab} />;
        })
      }
      <button type="button" onClick={() => { props.requestOpenTabs(Object.keys(resources), activeProj); }}>Open All </button>
      <button type="button">Should Delete Project</button>
    </ul>
  );
};

const mapStateToProps = (reduxState) => ({
  resources: reduxState.projects.projectResources.resources,
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestOpenTabs })(ResourceList);

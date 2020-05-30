import React from 'react';
import { connect } from 'react-redux';
import { requestOpenTabs } from '../../../../shared/actions/tabactions';

const Resource = (props) => {
  const { tab, activeProj } = props;
  return (
    <li key={tab.url} onClick={() => { props.requestOpenTabs(tab.url, activeProj); }}>
      { tab.title }
      { }
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestOpenTabs })(Resource);

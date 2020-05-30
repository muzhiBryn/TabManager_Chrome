
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestCloseTabs } from '../../../../../shared/actions/tabactions';

const CloseTabBtn = (props) => {
  return (
    <FontAwesomeIcon
      className="btn"
      icon="window-close"
      onMouseDown={(e) => { e.stopPropagation(); }}
      onMouseUp={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.requestCloseTabs(props.tab.id, props.activeProj);
      }}
    />
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestCloseTabs })(CloseTabBtn);

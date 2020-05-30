import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestAddResource } from '../../../../../shared/actions/projectactions';

const SaveTabBtn = (props) => {
  return (
    <FontAwesomeIcon
      className="btn"
      icon="save"
      onMouseDown={(e) => { e.stopPropagation(); }}
      onMouseUp={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.requestAddResource(props.tab, props.activeProj);
      }}
    />
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestAddResource })(SaveTabBtn);

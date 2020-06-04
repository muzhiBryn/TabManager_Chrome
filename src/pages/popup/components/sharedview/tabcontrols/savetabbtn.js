import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestAddResources } from '../../../../../shared/actions/projectactions';

const SaveTabBtn = (props) => {
  return (
    <FontAwesomeIcon
      className="btn"
      icon="star"
      onMouseDown={(e) => { e.stopPropagation(); }}
      onMouseUp={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.requestAddResources([props.tab], props.activeProj);
      }}
    />
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestAddResources })(SaveTabBtn);

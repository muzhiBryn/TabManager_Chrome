import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestMergeProjects } from '../../../../shared/actions/projectactions';
import { switchSynchronize } from '../../../../shared/actions/preferenceactions';

class Synchronize extends Component {
  constructor(props) {
    super(props);
    this.synchronizeClick = this.synchronizeClick.bind(this);
    this.noSyncrhonizeClick = this.noSyncrhonizeClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.locked !== 1) {
      if (this.props.synchronizing === 1 && this.props.synchronize === 1) { this.props.lockModal(); }
    }
  }

  synchronizeClick() {
    this.props.switchSynchronize(1);
    this.props.requestMergeProjects();
  }

  noSyncrhonizeClick() {
    this.props.switchSynchronize(0);
    this.props.history.goBack();
    this.props.history.goBack();
  }

  render() {
    if (this.props.synchronize === 0 || this.props.synchronizing === 2) {
      return <Redirect to="/" />;
    } else if (this.props.synchronizing === 1 && this.props.synchronize === 1) {
      return (
        <div>Synchronizing... this may take some time</div>
      );
    } else {
      return (
        <div>
          Do you want to synchronize your local storage with cloud?
          <button type="button" onClick={this.synchronizeClick}> Yes</button>
          <button type="button" onClick={this.noSyncrhonizeClick}><Link to="/">No</Link></button>
        </div>
      );
    }
  }
}
const mapStateToProps = (reduxState) => ({
  synchronizing: reduxState.projects.synchronizing,
  synchronize: reduxState.preferences.synchronize,
});

export default withRouter(connect(mapStateToProps, { switchSynchronize, requestMergeProjects })(Synchronize));

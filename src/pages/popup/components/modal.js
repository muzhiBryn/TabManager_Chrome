/* eslint-disable jsx-a11y/interactive-supports-focus */
// Reference: https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/

import React, { Component } from 'react';
import Synchronize from './modals/synchronize';
import '../scss/modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { locked: false };
    this.lockModal = this.lockModal.bind(this);
  }

  lockModal() {
    this.setState({ locked: true });
  }

  render() {
    return (
      <div
        role="button"
        className="modal-wrapper"
        onClick={() => { if (!this.state.locked) this.props.history.goBack(); }}
      >
        <div
          role="button"
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          {this.props.match.params.id.substr(1) === 'synchronize'
            ? <Synchronize locked={this.state.locked} lockModal={this.lockModal} />
            : 'Unknown modal'}
        </div>
      </div>
    );
  }
}

export default Modal;

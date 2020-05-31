// Reference: https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/

import React from 'react';
import { withRouter } from 'react-router-dom';
import Synchronize from './modals/synchronize';

const Modal = (props) => (
  <div
    role="button"
    className="modal-wrapper"
    onClick={() => props.history.goBack()}
  >
    <div
      role="button"
      className="modal"
      onClick={e => e.stopPropagation()}
    >
      {props.match.params.id.substr(1) == 'synchronize' ? <Synchronize/> : 'Unknown modal'}
    </div>
  </div>
);

export default withRouter(Modal);
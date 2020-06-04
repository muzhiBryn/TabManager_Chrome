import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = (props) => {
  return (
    <div>
      { props.authenticated
        ? (
          <div id="footer">
            <div>Welcome, {props.userName}</div>
            <div>
              <button type="button"
                onClick={() => {
                  // Handle signout
                  // Remember to set preference.synchronize back to -1, projects.synchronize back to 0
                }}
              >
                <FontAwesomeIcon className="btn" icon="sign-out-alt" />
              </button>
            </div>
          </div>
        )
        : (
          <div id="footer">
            <div>Login to synchronize your data to cloud</div>
            <div>
              <Link to="/login">
                <FontAwesomeIcon className="btn" icon="user" />
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
  userName: reduxState.auth.userName,
});

export default connect(mapStateToProps, null)(Footer);

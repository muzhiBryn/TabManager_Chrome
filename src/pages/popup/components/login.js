import React from 'react';
import { connect } from 'react-redux';
import Header from './sharedview/header';
import '../scss/login.scss';

const logIn = () => {
  console.log('Logged in!');
};

const Login = (props) => {
  return (
    <div>
      <Header />
      <div id="login">
        <div className="thin-row-container"><input placeholder="User name" /></div>
        <div className="thin-row-container"><input placeholder="Password" /></div>
        <div className="thin-row-container">
          <button
            type="button"
            onClick={() => {
              logIn();
              props.history.push({ pathname: '/modal:synchronize', state: { modal: true } });
            }}
          >Signin
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(Login);

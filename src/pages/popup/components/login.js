import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../scss/login.scss';

const logIn = () => {
  console.log('Logged in!');
};

const Login = (props) => {
  return (
    <div>
      <h1> Welcome to 2ManyTabz! </h1>
      <h2> Your new favorite chrome extension </h2>
      <div><NavLink to="/">Back</NavLink></div>
      <div id="login">
        <div><input /></div>
        <div><input /></div>
        <div>
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

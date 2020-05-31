import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const logIn = () => {
  console.log('Logged in!');
};

const Login = (props) => {
  return (
    <div>
      <div><NavLink to="/">Back</NavLink></div>
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
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(Login);

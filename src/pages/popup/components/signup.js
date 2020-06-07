/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Header from './sharedview/header';
import { requestSignIn, requestSignUp } from '../../../shared/actions/loginactions';
import '../scss/login.scss';

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      confpw: '',
      error: '',
    };
    // this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfPw = this.checkConfPw.bind(this);
  }

  componentDidUpdate() {
    const { authenticated } = this.props;
    if (authenticated) {
      this.props.history.push({ pathname: '/modal:synchronize', state: { modal: true } });
    }
  }

  onTypeChange(event) {
    this.setState({
      error: '',
    });
  }

  submitSignUp = () => {
    if (!this.checkEmail() && this.checkPassword() && this.checkConfPw()) return;
    const { email, password, userName } = this.state;
    this.props.requestSignUp({ email, password, userName }, this.props.history);
  }

  // submitSignOut = () => {
  //   this.props.requestSignOut(this.props.history);
  // }

  checkEmail(e) {
    const email = e ? e.target.value : this.state.email;
    if (!email || !validateEmail(email)) {
      this.setState({
        error: 'Please enter a valid email!',
      });
      if (e)e.target.focus();
      return false;
    } else {
      this.setState({
        email,
        error: '',
      });
      return true;
    }
  }

  checkPassword(e) {
    const password = e ? e.target.value : this.state.password;
    if (!password) {
      this.setState({
        error: 'Please enter your password!',
      });
      if (e)e.target.focus();
      return false;
    } else {
      this.setState({
        password,
        error: '',
      });
      return true;
    }
  }

  checkConfPw(e) {
    const confpw = e ? e.target.value : this.state.password;
    if (!confpw) {
      this.setState({
        error: 'The confirmed password is different from your password!',
      });
      if (e)e.target.focus();
      return false;
    } else {
      this.setState({
        confpw,
        error: '',
      });
      return true;
    }
  }

  checkName(e) {
    const userName = e ? e.target.value : this.state.name;
    if (!userName || !/^[a-zA-Z]+$/.test(String(userName))) {
      this.setState({
        error: 'Please enter a valid user name (only characters)!',
      });
      if (e)e.target.focus();
      return false;
    } else {
      this.setState({
        userName,
        error: '',
      });
      return true;
    }
  }

  render() {
    const {
      userName, email, password, confpw, error,
    } = this.state;
    const { rmError } = this.props;
    console.log(this.props.authenticated);
    if (!this.props.authenticated) {
      const signUpBtn = (
        <button
          type="button"
          className="primary"
          onClick={() => {
            this.submitSignUp();
          }}
        >SignUp
        </button>
      );

      const nameDiv = (
        <input type="text" placeholder="Name(should contain only characters)" defaultValue={userName} onBlur={this.checkName} />
      );

      const emailDiv = (
        <input type="text" placeholder="Email" defaultValue={email} onBlur={this.checkEmail} />
      );

      const passDiv = (
        <input type="password" placeholder="Password" defaultValue={password} onBlur={this.checkPassword} />
      );

      const confPwDiv = (
        <input type="password" placeholder="Comfirmed Password" defaultValue={confpw} onBlur={this.checkConfPw} />
      );

      const errorDiv = error || rmError
        ? (
          <div className="error-msg">{ error
        || rmError }
          </div>
        ) : null;

      return (
        <div id="login">
          <Header />
          <div className="sign-container">
            <div className="tabs">
              <div className="tab">
                <label htmlFor="sign-up-page">Sign up</label>
                <div className="content">
                  {nameDiv}
                  {emailDiv}
                  {passDiv}
                  {confPwDiv}
                  {signUpBtn}
                  {errorDiv}
                </div>
              </div>
              <div>
                <Link to="/signin">
                  Already have an account? Sign in here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}


const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
  userName: reduxState.auth.userName,
  rmError: reduxState.auth.error,
});

export default connect(mapStateToProps, { requestSignIn, requestSignUp })(SignIn);

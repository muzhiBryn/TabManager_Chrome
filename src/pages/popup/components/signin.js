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
      email: '',
      password: '',
      error: '',
    };
    // this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.submitSignIn = this.submitSignIn.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
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

  submitSignIn = () => {
    if (!(this.checkEmail() && this.checkPassword())) return;
    const { email, password } = this.state;
    this.props.requestSignIn({ email, password }, this.props.history);
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

  render() {
    const {
      email, password, error,
    } = this.state;
    const { rmError } = this.props;
    console.log(this.props.authenticated);
    if (!this.props.authenticated) {
      const signInBtn = (
        <button
          type="button"
          className="primary"
          onClick={() => {
            this.submitSignIn();
          }}
        >SignIn
        </button>
      );

      const emailDiv = (
        <input type="text" placeholder="Email" defaultValue={email} onBlur={this.checkEmail} />
      );

      const passDiv = (
        <input type="password" placeholder="Password" defaultValue={password} onBlur={this.checkPassword} />
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
                <label htmlFor="sign-in-page">Sign in</label>
                <div className="content">
                  {emailDiv}
                  {passDiv}
                  {signInBtn}
                  {errorDiv}
                </div>
              </div>
              <div>
                <Link to="/signup">
                  Sign up today!
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

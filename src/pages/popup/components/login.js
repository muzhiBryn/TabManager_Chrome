import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { requestSignIn, requestSignUp, requestSignOut } from '../../../shared/actions/loginactions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.submitSignIn = this.submitSignIn.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  onInputChangeHandler = (event) => {
    const name = event.target.getAttribute('name');
    const inputValue = event.target.value;

    this.setState(() => ({
      [name]: inputValue,
    }));

    console.log(inputValue);
    event.preventDefault();
  };


  submitSignIn = () => {
    const { email } = this.state;
    const { password } = this.state;
    this.props.requestSignIn({ email, password }, this.props.history);
  }


  submitSignUp = () => {
    const { email } = this.state;
    const { password } = this.state;
    this.props.requestSignUp({ email, password }, this.props.history);
  }

  submitSignOut = () => {
    this.props.requestSignOut(this.props.history);
  }

  render() {
    const {
      email, password,
    } = this.state;
    console.log(this.props.authenticated);
    let signInBtn, signUpBtn, signOutBtn, syncBtn, emailDiv, passDiv;
    if (!this.props.authenticated) {
      signInBtn = (
        <button
          id="submit"
          type="button"
          onClick={() => {
            this.submitSignIn();
          }}
        >SignIn
        </button>
      );

      signUpBtn = (
        <button
          id="submit"
          type="button"
          onClick={() => {
            this.submitSignUp();
          }}
        >SignUp
        </button>
      );

      emailDiv = (
        <div>email:
          <input type="text"
            name="email"
            onChange={(e) => this.onInputChangeHandler(e)}
            value={email}
          />
        </div>
      );

      passDiv = (
        <div>password:
          <input type="password"
            name="password"
            onChange={(e) => this.onInputChangeHandler(e)}
            value={password}
          />
        </div>
      );
    } else {
      signOutBtn = (
        <button
          id="submit"
          type="button"
          onClick={() => {
            this.submitSignOut();
          }}
        >SignOut
        </button>
      );
      syncBtn = (
        <button
          id="submit"
          type="button"
          onClick={() => {
            this.props.history.push({ pathname: '/modal:synchronize', state: { modal: true } });
          }}
        >synchronize
        </button>
      );
      emailDiv = (
        <div>You have logged in as {this.props.userName}</div>
      );
    }
    return (
      <div className="login-input">
        <div><NavLink to="/">Back</NavLink></div>
        {emailDiv}
        {passDiv}
        <div>
          {signInBtn}
          {signUpBtn}
          {syncBtn}
          {signOutBtn}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
  userName: reduxState.auth.userName,
});

export default connect(mapStateToProps, { requestSignIn, requestSignUp, requestSignOut })(Login);

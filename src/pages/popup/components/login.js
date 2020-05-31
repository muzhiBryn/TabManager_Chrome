import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const logIn = () =>{
  console.log("Logged in!");
}

const Login = (props) => {
  return (
    <div>
      <div><a onClick={()=>props.history.push('/')}>Back</a></div>
      <div><input /></div>
      <div><input /></div>
      <div><button onClick={()=>{
        logIn();
        props.history.push({pathname: '/modal:synchronize', state: {modal:true} });
      }}>Signin</button></div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, null )(Login));

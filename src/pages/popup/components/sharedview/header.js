import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
  return (
    <div id="header" className="container">
      <h1> {props.title || 'Welcome to 2ManyTabz!'} </h1>
      <NavLink to="/home"><FontAwesomeIcon icon="home" /></NavLink>
    </div>
  );
};

export default withRouter(Header);

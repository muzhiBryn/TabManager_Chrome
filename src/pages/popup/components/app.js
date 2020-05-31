import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit as faEditRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faWindowClose, faPlus, faSave, faArrowDown, faUser, faSignOutAlt, faEdit as faEditSolid,
} from '@fortawesome/free-solid-svg-icons';
import TabManager from './tabmanager';
import ProjectDetail from './projectdetail';
import Login from './login';
import Modal from './modal';

// FontAwesome notes: https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react

library.add(faWindowClose, faPlus, faSave, faArrowDown, faUser, faSignOutAlt, faEditRegular, faEditSolid);

class App extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
  }

  componentWillUpdate() {
    const { location } = this.props;
    if (!(location.state && location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = (
      location.state
      && location.state.modal // Should be specified when redirecting
      && this.previousLocation !== location
    );

    return (
      <div className="container">
        <h1> Welcome to 2ManyTabz! </h1>
        <h2> Your new favorite chrome extension </h2>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/project/:proj" component={ProjectDetail} />
          <Route path="/login" component={Login} />
          <Route component={TabManager} />
        </Switch>
        {isModal
          ? <Route exact path="/modal:id" component={Modal} />
          : null}
      </div>
    );
  }
}

export default withRouter(App);

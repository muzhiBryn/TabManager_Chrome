import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit as faEditRegular, faFolder, faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faWindowClose, faPlus, faStar, faChevronDown, faChevronUp, faUser, faSignOutAlt, faHome, faEdit as faEditSolid,
} from '@fortawesome/free-solid-svg-icons';
import TabManager from './tabmanager';
import ProjectDetail from './projectdetail';
import SignIn from './signin';
import SignUp from './signup';
import Modal from './modal';
import '../scss/shared.scss';

// FontAwesome notes: https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react

library.add(faEditRegular, faFolder, faTrashAlt);
library.add(faWindowClose, faPlus, faStar, faChevronDown, faChevronUp, faUser, faSignOutAlt, faHome, faEditSolid);

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
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/project/:proj" component={ProjectDetail} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
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

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit as faEditRegular
} from '@fortawesome/free-regular-svg-icons';
import {
  faWindowClose, faPlus, faSave, faArrowDown, faEdit as faEditSolid
} from '@fortawesome/free-solid-svg-icons';
import TabManager from './tabmanager';
import ProjectDetail from './projectdetail';

// FontAwesome notes: https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react

library.add(faWindowClose, faPlus, faSave, faArrowDown, faEditRegular, faEditSolid,);

const App = () => {
  return (
    <div className="container">
      <h1> Welcome to 2ManyTabz! </h1>
      <h2> Your new favorite chrome extension </h2>
      <Router>
        <Switch>
          <Route exact path="/project/:proj" component={ProjectDetail} />
          <Route component={TabManager} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

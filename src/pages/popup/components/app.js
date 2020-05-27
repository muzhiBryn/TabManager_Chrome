import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TabManager from './tabmanager';
import ProjectDetail from './projectdetail';

library.add(fab, faWindowClose);

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

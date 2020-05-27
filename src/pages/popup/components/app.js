import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TabManager from './tabmanager';

library.add(fab, faWindowClose);

const App = (props) => {
  return (
    <div className="container">
      <h1> Welcome to 2ManyTabz! </h1>
      <h2> Your new favorite chrome extension </h2>
      <TabManager />
    </div>
  );
};

export default App;

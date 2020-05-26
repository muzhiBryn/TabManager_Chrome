import React from 'react';
import TabManager from './tab-manager';

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

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './componets/app';
"use strict";
// reference: https://reactjs.org/docs/add-react-to-a-website.html

class App extends React.Component {
  render() {
    return e(
      'div', {className: "container"},
      e(
        'h1', null, 'Welcome to 2ManyTabz!',
      ),
      e(
        'h2', null, 'Your new favorite chrome extension.',
      ),
      e(TabManager)
    );
  }
}

ReactDOM.render(e(App), document.querySelector('#main'));
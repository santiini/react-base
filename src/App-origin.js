import React, { Component } from 'react';

import setHeader from './hoc/setHeader'
import logo from './logo.svg';
import './App.styl';

@setHeader('sunxt')
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="App-demo">11111</div>
      </div>
    );
  }
}

export default App;

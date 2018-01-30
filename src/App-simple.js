import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  NavLink,
 } from 'react-router-dom';

// import Demo1Component from './views/demo1/Demo1'
import Demo1Component from './views/containers/demo1/Demo1';
import Demo2Component from './views/demo2/Demo2';
import Demo3Component from './views/containers/demo3/Demo3';
import Demo4Component from './views/demo4/Demo4';
import Demo5Component from './views/demo5/Demo5';
import Home from './views/Home';
import logo from './logo.svg';
import './App.styl';

class App extends Component {

  handleClick = (e) => {
    console.log(111111)
    console.log(e.target)
  }

  clickWithParams = (name) => {
    console.log(name)
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h2>Reac Demo</h2>
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header> */}
          {/* <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="app-btn" onClick={this.handleClick}>点击事件1111</div>
          <div className="app-btn" onClick={() => {this.clickWithParams('sun')}}>点击事件222</div> */}
          <div className="router-switch">
            <NavLink to="/demo1" className="link-router" activeStyle={{color: '#50cc5d'}}>
              <span>demo1</span>
            </NavLink>
            <NavLink to="/demo2" className="link-router" activeStyle={{color: '#50cc5d'}}>
              <span>demo2</span>
            </NavLink>
            <NavLink to="/demo3" className="link-router" activeStyle={{color: '#50cc5d'}}>
              <span>demo3</span>
            </NavLink>
            <NavLink to="/demo4" className="link-router" activeStyle={{color: '#50cc5d'}}>
              <span>demo4</span>
            </NavLink>
            <NavLink to="/demo5" className="link-router" activeStyle={{color: '#50cc5d'}}>
              <span>demo5</span>
            </NavLink>
          </div>
          <div className="router-view">
            <Switch>
              <Route path="/demo1" component={Demo1Component} />
              <Route path="/demo2" component={Demo2Component} />
              <Route path="/demo3" component={Demo3Component} />
              <Route path="/demo4" component={Demo4Component} />
              <Route path="/demo5" component={Demo5Component} />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

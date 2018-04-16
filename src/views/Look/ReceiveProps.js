import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Button } from 'antd';

import UserList from './users/UserLists';

export default class ReceiveProps extends Component {

  componentDidMount() {
    // console.log('mount');
  }

  componentWillReceiveProps(nextProps, prevProps) {
    // console.log('will receive')
    console.log(nextProps);
  }

  componentDidUpdate(curProps, prevProps) {
    // console.log('did update')
  }

  renderList = (item, i) => (
    <div className="" key={i}>{`item${i}--${item}`}</div>
  );

  render() {
    return (
      <div className="looks">
        <div className="">
          <Link to="/react/receiveProps/1/detail">
            <Button>跳转11</Button>
          </Link>
          <Link to="/react/receiveProps/2/detail">
            <Button>跳转22</Button>
          </Link>
          <Link to="/react/receiveProps/3/detail">
            <Button>跳转33</Button>
          </Link>
        </div>
        <div className="route">
          <Switch>
            <Route path="/react/receiveProps/:id/detail" component={UserList} />
            <Redirect from="*" to="/react/receiveProps/1/detail" />
          </Switch>
        </div>
      </div>
    )
  }
}
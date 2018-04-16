import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button } from 'antd';

import Team from './team'
import Login from './Login'
import Logout from './Logout'

export default class Demo3 extends React.Component {
  render() {
    // 父路由总会触发
    console.log('父路由中');
    console.log(this.props)
    return (
      <div>
        <div className="">/kol/app</div>
        <div>
          <Link to="/kol/app3/3">
            <Button>team</Button>
          </Link>
          <Link to="/kol/app3/logout">
            <Button>logout</Button>
          </Link>
          <Link to="/kol/app3/login">
            <Button>login</Button>
          </Link>
        </div>
        <Switch>
          <Route path="/kol/app3/logout" component={Logout} />
          <Route path="/kol/app3/login" component={Login} />
          <Route path="/kol/app3/:teamId" component={Team} />
        </Switch>
      </div>
    )
  }
}
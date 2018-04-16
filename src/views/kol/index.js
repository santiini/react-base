import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button } from 'antd';

import Team from './team'
import Login from './Login'
import Logout from './Logout'
import Layoout from './Layout';

export default class Kol extends React.Component {

  componentWillMount() {
    console.log('父组件获取')
    this.props.history.push('/kol/app/3');
  }

  fetchData = (id) => {
    console.log(`fetch  ${id}`);
  }

  render() {
    // 父路由总会触发
    console.log('父路由中');
    // console.log(this.props)
    return (
      <div>
        <div className="">/kol/app</div>
        <div>
          <Link to="/kol/app/3">
            <Button>team3</Button>
          </Link>
          <Link to="/kol/app/4">
            <Button>team4</Button>
          </Link>
          <Link to="/kol/app/5">
            <Button>team5</Button>
          </Link>
          <Link to="/kol/app/logout">
            <Button>logout</Button>
          </Link>
          <Link to="/kol/app/login">
            <Button>login</Button>
          </Link>
        </div>
        <Switch>
          <Route path="/kol/app" exact component={Layoout} />
          <Route path="/kol/app/logout" component={Logout} />
          <Route path="/kol/app/login" component={Login} />
          <Route path="/kol/app/:teamId" component={Team} />
        </Switch>
      </div>
    )
  }
}
import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';

import Team from './team'
import Login from './Login'
import RedirectCom from './Redirect'

export default class Demo2 extends React.Component {
  state = {
    session: null,
    isLoading: false,
  }

  componentWillMount() {
    console.log('获取session')
    this.setState({ isLoading: true })
    setTimeout(() => {
      // window.localStorage.setItem('session', 'sunxiaotao');
      this.setState({
        session: 'sunxiaotao',
        isLoading: false,
      })
    }, 5000)
  }

  changeCom = () => {
    window.localStorage.setItem('session', 'sunxiaotao');
  }

  delSession = () => {
    window.localStorage.removeItem('session', 'sunxiaotao');
  }
  render() {
    // 父路由总会触发
    console.log('父路由中');
    console.log(this.props);
    // const session = window.localStorage.getItem('session');
    const { session, isLoading } = this.state;
    if (isLoading) {
      return <div className="">
        <div className="">加载中。。。</div>
      </div>
    }
    if (!session) {
      return (
        <div className="">
          <div className="">没有信息</div>
          <div className="">
            <Button onClick={this.changeCom}>添加session</Button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="">/kol/app</div>
        <div>
          <Link to="/kol/app2/3">
            <Button>team</Button>
          </Link>
          <Link to="/kol/app2/login">
            <Button>login</Button>
          </Link>
        </div>
        <div className="">
          <Button onClick={this.delSession}>删除session</Button>
        </div>
        <Switch>
          <Redirect from="/kol/app2" exact to="/kol/app2/redirect" />
          <Route path="/kol/app2/redirect" component={RedirectCom} />
          <Route path="/kol/app2/login" component={Login} />
          <Route path="/kol/app2/:teamId" component={Team} />
        </Switch>
      </div>
    )
  }
}
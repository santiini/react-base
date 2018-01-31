import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './views/layout/Navbar';
import Siderbar from './views/layout/Siderbar';
import routes from '@/router';
import RouteComponent1 from './views/routeComponent/Demo1'
import './App.styl';

/* eslint-disable import/no-webpack-loader-syntax */
// 按需加载的测试
import Bundle from './router/resolve';
// import Demo6 from './views/demo6/Demo6'
// import loadDemo6 from 'bundle-loader?lazy!./views/demo6/Demo6'; // bundle-loader 形式
const Resolve1 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/demo6/Demo6')}>
    {(Resolve1) => <Resolve1 {...props} />}
  </Bundle>
);
const Resolve2 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/resolve2/Resolve2')}>
    {(Resolve2) => <Resolve2 {...props} />}
  </Bundle>
);
const Resolve3 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/resolve3/Resolve3')}>
    {(Resolve3) => <Resolve3 {...props} />}
  </Bundle>
);

const { Content, Footer } = Layout;

class AppLayout extends Component {
  render() {
    return (
      // 默认的 Layout 没有 height 100% 的 css, 这里根元素需要设置: #app, 第一层 Layout, height: 100%
      <Router>
        <Layout className="layout-body">
          <Navbar />
          <Layout>
            <Siderbar />
            <Layout>
              <Content style={{margin: '24px 16px 0 ', backgroundColor: '#fff', overflow: 'initial'}}>
                <Switch>
                  <Route path="/test1" component={RouteComponent1} />
                  {
                    routes.map(({path, name, component}) => (
                      <Route path={path} key={name} component={component} />  
                    ))
                  }
                  <Route path="/resolve1" component={Resolve1} />
                  <Route path="/resolve2" component={Resolve2} />
                  <Route path="/resolve3" component={Resolve3} />
                  <Route component={RouteComponent1} />
                </Switch>
              </Content>
              <Footer style={{textAlign: 'center'}}>Ant Design ©2016 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Layout>    
      </Router>
    )
  }
}

export default AppLayout;
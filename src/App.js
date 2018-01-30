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
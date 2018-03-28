import React, { Component } from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from './views/layout/Navbar';
import Siderbar from './views/layout/Siderbar';
import Home from './views/Home'
import routes, { getRouteData } from './router';
import BreadcrumbList from './views/layout/Breadcrumb';
import './App.styl';
/* eslint-disable import/no-webpack-loader-syntax */

const { Content, Footer } = Layout;

class AppLayout extends Component {
  static childContextTypes = {
    routeData: PropTypes.object,
    routes: PropTypes.array,
  }

  getChildContext = () => {
    return {
      routeData: getRouteData(),
      routes,
    }
  }

  render() {
    return (
      // 默认的 Layout 没有 height 100% 的 css, 这里根元素需要设置: #app, 第一层 Layout, height: 100%
      <Router>
        <Layout className="layout-body">
          <Navbar />
          <Layout>
            <Siderbar />
            <Layout>
              <BreadcrumbList />
              <Content className="main-content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  {
                    routes.map(({path, name, component}) => (
                      <Route path={path} key={name} component={component} />  
                    ))
                  }
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
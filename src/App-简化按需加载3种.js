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
import RouteComponent1 from './views/Home'
import './App.styl';
/* eslint-disable import/no-webpack-loader-syntax */
// tips: 按需加载的3中形式:

import importCom from './router/bundle';
import resolveCom from './router/resolve';

// 形式一: bundle-loader 形式的按需加载， react-router 的方式;
//  loadDemo6 替代 () => import(path) 函数即可;
// import loadDemo6 from 'bundle-loader?lazy!./views/demo6/Demo6'; // bundle-loader 形式

// 形式二: Bundle 组件和 import() 实现的按需加载，推荐;

const Resolve1 = importCom(() => import('./views/demo6/Demo6'));
const Resolve2 = importCom(() => import('./views/Resolve2/Resolve2'));
const Resolve3 = importCom(() => import('./views/resolve3/Resolve3'));

// 形式三： 利用异步加载函数 和 import() 函数实现的按需加载;
const Resolve4 = resolveCom(() => import('./views/Resolve1'));
const Resolve5 = resolveCom(() => import('./views/Resolve2'));

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
                  <Route path="/resolve4" component={Resolve4} />
                  <Route path="/resolve5" component={Resolve5} />
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
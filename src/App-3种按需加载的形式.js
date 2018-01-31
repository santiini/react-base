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

// tips: 按需加载的3中形式:

/* eslint-disable import/no-webpack-loader-syntax */
// 按需加载的测试

// 形式二: Bundle 组件和 import() 实现的按需加载，推荐;
import Bundle from './router/resolve';
// import Demo6 from './views/demo6/Demo6'

// 形式一: bundle-loader 形式的按需加载， react-router 的方式;
// import loadDemo6 from 'bundle-loader?lazy!./views/demo6/Demo6'; // bundle-loader 形式
const Resolve1 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/demo6/Demo6')}>
    {(Com) => <Com {...props} />}
  </Bundle>
);
const Resolve2 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/Resolve2/Resolve2')}>
    {(Com) => <Com {...props} />}
  </Bundle>
);
const Resolve3 = (props) => (
  // <Bundle load={loadDemo6}>  // bundle-loader 形式
  <Bundle load={() => import('./views/resolve3/Resolve3')}>
    {(Com) => <Com {...props} />}
  </Bundle>
);

const { Content, Footer } = Layout;

// 形式三： 利用异步加载函数 和 import() 函数实现的按需加载;
// 异步按需加载component
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

// 组件引用
function load(component) {
  return () => import(`./views/${component}/`)
}
// function load(component) {
//   return import(`./views/${component}/`)
// }

const Resolve4 = asyncComponent(load('Resolve1'));
const Resolve5 = asyncComponent(load('Resolve2'));
// const Resolve1 = asyncComponent(() => load('Resolve1'));
// const Resolve2 = asyncComponent(() => load('Resolve2'));

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
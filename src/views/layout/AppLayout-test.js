import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import routes, { topMenus, sideMenus } from '@/router';
import RouteComponent1 from '../Home'
import './appLayout.styl';

const { Header, Sider, Content, Footer } = Layout;
const { Item, SubMenu } = Menu;

class AppLayout extends Component {
  render() {
    // 菜单构造
    const menus = sideMenus.map((menu) => {
      if (menu.children) {
        const subTitle = <span><Icon type={menu.icon || 'setting'} />{menu.title}</span>
        return (
          <SubMenu key={menu.name} title={subTitle}>
            {
              menu.children.map((subMenu) => (
                <Item key={subMenu.name}>
                  <Link to={subMenu.path}>{subMenu.title}</Link>
                </Item>
              ))
            }
          </SubMenu>
        );
      }
      return (
        <Item key={menu.name}>
          <Link to={menu.path}>
            <Icon type={menu.icon || 'user'} />
            <span>{menu.title}</span>
          </Link>
        </Item>
      );
    });
    // nav 结构
    const navMenus = topMenus.map((menu) => (
      <Item key={menu.name}>
        <Link to={menu.path}>
          <Icon type={menu.icon || 'mail'} />{menu.name}
        </Link>
      </Item>
    ));
    console.log(routes)
    const routeArr = routes.map(({ path, name, component }) => (
      <Route path={path} key={name} component={component} />
    ));
    console.log(routeArr)
    return (
      // 默认的 Layout 没有 height 100% 的 css, 这里根元素需要设置: #app, 第一层 Layout, height: 100%
      <Router>
        <Layout className="layout-body">
          <Header style={{ backgroundColor: '#fff', padding: 0, display: 'flex' }}>
            <div className="nav-logo">
              <div className="nav-logo-content">1</div>
            </div>
            <Menu
              defaultSelectedKeys={['nav1']}
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px', flex: 1 }}
            >
              {navMenus}
            </Menu>
          </Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={['demo1']}
                style={{ height: '100%' }}
              >
                {menus}
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px' }}>
                <Switch>
                  <Route path="/test1" component={RouteComponent1} />
                  {routeArr}
                  <Route component={RouteComponent1} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default AppLayout;
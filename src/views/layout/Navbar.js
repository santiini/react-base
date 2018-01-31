import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { topMenus } from '@/router';

const { Header } = Layout;
const { Item } = Menu;
// nav 结构
const navMenus = topMenus.map((menu) => (
  <Item key={menu.name}>
    <Link to={menu.path}>
      <Icon type={menu.icon || 'mail'} />{menu.name}
    </Link>
  </Item>
));

class Navbar extends Component {
  render() {
    return (
      <Header style={{backgroundColor: '#fff', padding: 0, display: 'flex'}}>
      <div className="nav-logo">
        <div className="nav-logo-content"></div>
      </div>
      <Menu
        defaultSelectedKeys={['nav1']}
        theme="dark"
        mode="horizontal"
        style={{lineHeight: '64px', flex: 1}}
      >
        {navMenus}
        <Item key="resolve1">
          <Link to="/resolve1">
            <Icon type="mail" /> resolve1
          </Link>
        </Item>
        <Item key="resolve2">
          <Link to="/resolve2">
            <Icon type="mail" /> resolve2
          </Link>
        </Item>
        <Item key="resolve3">
          <Link to="/resolve3">
            <Icon type="mail" /> resolve3
          </Link>
        </Item>
        <Item key="resolve4">
          <Link to="/resolve4">
            <Icon type="mail" /> resolve4
          </Link>
        </Item>
        <Item key="resolve5">
          <Link to="/resolve5">
            <Icon type="mail" /> resolve5
          </Link>
        </Item>
      </Menu>
    </Header>
    )
  }
}

export default Navbar;
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
      </Menu>
    </Header>
    )
  }
}

export default Navbar;
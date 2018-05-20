import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { sideMenus } from '@/router';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;
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

class SiderBar extends Component {
  render() {
    return (
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={['demo1']}
          style={{ height: '100%', overflow: 'scroll', paddingBottom: '30px' }}
        >
          {menus}
        </Menu>
      </Sider>
    )
  }
}

export default SiderBar;
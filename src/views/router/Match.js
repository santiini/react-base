import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Menu } from 'antd';

import Content1 from './Match/Demo1';
import Content2 from './Match/Demo2';
import Content3 from './Match/Demo3';

const { Item } = Menu;

// 父组件中
const Hot = ({ match }) => (
  <div>
    <h4>热门新闻: 子路由中的路由设置</h4>
    <Menu mode="horizontal">
        <Item key="acticle">
      <Link to={`${match.url}/acticle`}>文章</Link>
      </Item>
      <Item key="news">
        <Link to={`${match.url}/news`}>新闻</Link>
      </Item>
      <Item key="answers">
        <Link to={`${match.url}/answers`}>answers</Link>
      </Item>
      <Item key="goods">
        <Link to={`${match.url}/goods`}>goods</Link>
      </Item>
      <Item key="demo1">
        <Link to={`${match.url}/demo1`}>demo11</Link>
      </Item>
      <Item key="demo2">
        <Link to={`${match.url}/demo2`}>demo22</Link>
      </Item>
    </Menu>
    <Switch>
      <Route path={`${match.url}/demo1`} component={Content1} />
      <Route path={`${match.url}/demo2`} component={Content2} />
      <Route path={`${match.url}/:type`} component={Content3} />
    </Switch>
  </div>
);

export default Hot;
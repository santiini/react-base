import React, { Component } from 'react';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
export default class Resolve2 extends Component {
  render() {
    return (
      <div>
        <h4>App</h4>
        <Tabs>
          <TabPane tab="/city" key={`tabs_city`}>
            <div className="">当前router: city</div>
            <Link to="/city">City</Link>
          </TabPane>
          <TabPane tab="/user" key={`tabs_user`}>
            <div className="">当前router: user</div>
            <Link to="/user">user</Link>
          </TabPane>
          <TabPane tab="/empty" key={`tabs_empty`}>
            <div className="">当前router: empty</div>
            <Link to="/user">user</Link>
          </TabPane>
          <TabPane tab="detail/:id" key={`tabs_detail`}>
            <div className="">当前router: details</div>
            <Link to="/detail/1">details</Link>
          </TabPane>
        </Tabs>
        {this.props.children}
      </div>
    )
  }
}
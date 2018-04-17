import React, { Component } from 'react'
import { Card, Button } from 'antd';
import _ from 'lodash';

export default class extends Component {

  testMap = () => {
    const list = [
      { name: 'sssss' },
      { name: 'ddd' },
      { name: 'www' },
    ];
    const map1 = {
      1: { title: '111' },
      2: { title: '222' },
      3: { title: '333' },
    }
    _.map(list, (val, key) => {
      console.log(val, key);
    })
    console.log(_.map(map1, (v) => v));
  }
  render() {
    return (
      <div className="">
        <Card title="lodash">
          <div className="">
            <h4>lodash-map</h4>
            <div className="">
              <Button onClick={this.testMap}>测试map</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
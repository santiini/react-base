import React, { Component } from 'react'

import Hoc2 from '../../hoc/Hoc2';

@Hoc2
export default class Demo2 extends Component {
  componentDidMount() {
    // 在 反向代理 中，组件的继承关系，不存在嵌套，所以只会存在一个, 只会打印 Hoc 中信息;
    console.log('component222 mount');
  }
  render() {
    return (
      <div>
        <h4>hoc: 反向继承</h4>
      </div>
    );
  }
}
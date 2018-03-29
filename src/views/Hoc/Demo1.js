import React, { Component } from 'react'

import Hoc1 from '../../hoc/Hoc1';

@Hoc1
export default class Demo1 extends Component {
  componentDidMount() {
    // 属性代理中，因为 组件嵌套 的关系，两次都会触发;
    console.log('component mounted');
  }

  render() {
    return (
      <div>
        <h4>hoc: 属性代理</h4>
      </div>
    );
  }
}
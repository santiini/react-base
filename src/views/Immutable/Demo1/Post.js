/**
 * 展示型组件: Dumb 组件
 * 1. 不要使用 Immutable 对象
 * 2. 使用 Hoc(高阶组件) 把 Smart 组件传入的 immutable 的 props 解析;
 */
import React, { PureComponent } from 'react'

class Demo1 extends PureComponent {
  render() {
    return (
      <div className="">
        <h1>Dumb 展示型组件</h1>
      </div>
    );
  }
}

export default Demo1;

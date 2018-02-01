/**
 *  按需加载形式三： 
 *  利用异步加载函数 和 import() 函数实现的按需加载;
 */
import React, { Component } from 'react';

// 组件引用
export const resolve = (path) => () => import(path);

// 异步按需加载component
const asyncComponent = (getComponent) => class AsyncComponent extends Component {
  static Component = null;

  state = {
      Component: AsyncComponent.Component,
  };

  // 通过 static 和 state 保存组件引用;
  componentWillMount() {
    if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
        AsyncComponent.Component = Component
        this.setState({ Component })
        })
    }
  }

  render() {
    // 获取到组件引用时，渲染组件
    const { Component } = this.state
    if (Component) {
      return <Component {...this.props} />
    }
    return null
  }
}

export default asyncComponent;
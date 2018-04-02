/**
 *  按需加载形式三： 
 *  利用异步加载函数 和 import() 函数实现的按需加载;
 */
import React, { Component } from 'react';

// 组件引用
// export const resolve = (path) => () => import(path);

// 异步按需加载component
const asyncComponent = (importComponent) => class AsyncComponent extends Component {
  state = {
      component: null,
  };

  async componentDidMount() {
    console.log('按需加载形式3')
    if (!this.state.component) {
      const { default: component } = await importComponent();

      this.setState({ component });
    }
  }

  render() {
    // 获取到组件引用时，渲染组件
    // const Component = this.state.component;
    const { component: Component } = this.state
    if (Component) {
      return <Component {...this.props} />
    }
    return null
  }
}

export default asyncComponent;